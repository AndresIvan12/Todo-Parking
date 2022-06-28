import {pool} from '../../../../config/db'; 

export default async function Handler(req, res){

  switch(req.method){
    case 'GET':
      return await getAnuncioImg(req, res)
    case 'DELETE':
      return await deleteImg(req, res)
    case 'PUT':
      return await updateImg(req, res)
    default:
      break;
  }
}

   
const getAnuncioImg = async (req, res) => {
  
  const {id} = req.query

  const {rows} = await pool.query('SELECT * FROM anuncio LEFT JOIN imagenanuncio ON anuncio.id_anuncio = imagenanuncio.id_anuncio WHERE anuncio.id_anuncio = $1', [id]);

  

  return res.status(200).json(rows[0])
  
}

  const deleteImg = async (req, res) => {
    const {id} = req.query
  
     const result = await pool.query('DELETE FROM imagenanuncio WHERE id_anuncio = $1', [id])
  
     return res.status(204).json()
  }

  const updateImg = async (req, res) => {
    const {nombre, id_anuncio, url, bytes, formato} = req.body;

    try {
      const data = await pool.query("UPDATE imagenanuncio SET nombre = ($1), id_anuncio = ($2), url = ($3), bytes = ($4), formato = ($5) WHERE id_anuncio = ($2)", [
        nombre,
        id_anuncio,
        url,
        bytes,
        formato
      ])
      
      return res.status(200).json(data)
    } catch(error){
        console.error(error.message);
    }
  }
    
