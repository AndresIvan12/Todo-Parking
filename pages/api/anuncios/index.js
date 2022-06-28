import {pool} from '../../../config/db';
import { verify } from "jsonwebtoken";

export default async function Handler(req, res){

  switch(req.method){
    case 'GET':
      return await obtenerAnuncios(req, res);
    case 'POST':
      return await guardarAnuncio(req, res);
      
  }

  
}


const secret = process.env.JWT_SECRET;



const obtenerAnuncios = async (req, res) => {
  const {rows} = await pool.query("SELECT * FROM anuncio;");

  return res.status(200).json(rows);
}

const guardarAnuncio = async (req, res) => {
  const { cookies } = req;

  const jwt = cookies.OursiteJWT

  const usuario = verify(jwt, secret);
  const {titulo, precio, descripcion, id_estacionamiento} = req.body;

  const {rows} = await pool.query('SELECT * FROM usuario WHERE correo = $1', [usuario.correo])


  if(rows){
    const resultAnuncio = await pool.query("INSERT INTO anuncio  (titulo, precio, descripcion, estado, id_usuario, id_estacionamiento) VALUES ($1, $2, $3, $4, $5, $6)", [
      titulo,
      precio,
      descripcion,
      "activo",
      rows[0].id_usuario,
      parseInt(id_estacionamiento)
    ])

    return res.status(200).json({ message: "Anuncio guardado" });
  }else{
    return res.status(400).json({message: "No se pudo guardar el anuncio"});
  }

  

  return res.status(200).json({});
}

