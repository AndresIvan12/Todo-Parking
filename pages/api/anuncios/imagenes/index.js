import {pool} from '../../../../config/db';

export default async function Handler(req, res){

  switch(req.method){
    case 'GET':
      return await obtenerAnunciosImg(req, res);

    case 'POST':
      return await guardarImagen(req, res);
      
  }

  
}

const obtenerAnunciosImg = async (req, res) => {
  const {rows} = await pool.query("SELECT * FROM anuncio LEFT JOIN imagenanuncio ON anuncio.id_anuncio = imagenanuncio.id_anuncio LEFT JOIN estacionamiento ON anuncio.id_estacionamiento = estacionamiento.id_estacionamiento;");

  return res.status(200).json(rows);
  
}

const guardarImagen = async (req, res) => {
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
