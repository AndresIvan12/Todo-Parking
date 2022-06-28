import {pool} from '../../../../config/db';

export default async function Handler(req, res){

  switch(req.method){
    case 'GET':
      return await obtenerAnunciosUsuario(req, res);

    case 'POST':
      return await obtenerAnunciosUsuario(req, res);
      
  }

  
}

const obtenerAnunciosUsuario = async (req, res) => {
  const {correo} = req.body;

  const {rows} = await pool.query('SELECT * FROM usuario WHERE correo = $1', [correo])

  if(rows[0].id_usuario){
    const anuncios = await pool.query("SELECT * FROM anuncio LEFT JOIN imagenanuncio ON anuncio.id_anuncio = imagenanuncio.id_anuncio LEFT JOIN usuario ON usuario.id_usuario = anuncio.id_usuario WHERE usuario.id_usuario = $1;", [rows[0].id_usuario]);

    return res.status(200).json(anuncios.rows);
  }

  

  return res.status(200).json(rows);
  
}

const guardarAnuncioUsuario = async (req, res) => {
  const {nombre, id_anuncio, url, bytes, formato} = req.body;

  const resultImagen = await pool.query("INSERT INTO imagenanuncio  (nombre, id_anuncio, url, bytes, formato) VALUES ($1, $2, $3, $4, $5)", [
    nombre,
    id_anuncio,
    url,
    bytes,
    formato
 ])

  return res.status(200).json({});
}
