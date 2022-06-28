import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import {pool} from '../../../config/db'; 

const secret = process.env.JWT_SECRET;

export default async function login(req, res){
  const { correo, password } = req.body;

  const {rows} = await pool.query('SELECT * FROM usuario WHERE correo = $1 AND contraseña = $2', [correo, password])

  if(rows.length === 0){
    return res.status(404).json({
      message: "Usuario o contraseña incorrectos"
    })
  }

  if(rows[0].correo === correo && rows[0].contraseña === password){

    // Crear Token
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        id: rows[0].id_usuario,
        correo: rows[0].correo,
        nombre: rows[0].nombre,
        tipo: rows[0].tipo,
      },
      secret
    );

    // Crear Cookie
    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Success!" });

  }else{
    res.json({ message: "Invalid credentials!" });
  }

  
      
}