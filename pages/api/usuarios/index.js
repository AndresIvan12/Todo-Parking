import {pool} from '../../../config/db';

export default async function Handler(req, res){

  switch(req.method){
    case 'GET':
      return await obtenerUsuarios(req, res);
    case 'POST':
      return await guardarUsuario(req, res);
      
  }

  
}

const obtenerUsuarios = async (req, res) => {

  const {rows} = await pool.query("SELECT * FROM usuario;");

  return res.status(200).json(rows);
  
}

const guardarUsuario = async (req, res) => {
  const {nombre, apellido, direccion, correo, telefono, password} = req.body;

  const resultAnuncio = await pool.query("INSERT INTO usuario  (nombre, apellido, tipo_usuario, nro_anuncios, direccion, correo, telefono, contraseña) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
    nombre,
    apellido,
    "usuario",
    0,
    direccion,
    correo,
    telefono,
    password
  ])

  

  return res.status(200).json({});
}

