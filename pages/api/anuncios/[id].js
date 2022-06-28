import {pool} from '../../../config/db'; 

export default async function Handler(req, res){

  switch(req.method){
    case 'GET':
      return await getAnuncio(req, res)
    case 'DELETE':
      return await deleteAnuncio(req, res)
    case 'PUT':
      return await updateAnuncio(req, res)
    default:
      break;
  }
}

   
  const getAnuncio = async (req, res) => {
    const {id} = req.query

    const {rows} = await pool.query('SELECT * FROM anuncio WHERE id_anuncio = $1', [id])

    return res.status(200).json(rows[0])
  }

  const deleteAnuncio = async (req, res) => {
    const {id} = req.query
  
     const result = await pool.query('DELETE FROM anuncio WHERE id_anuncio = $1', [id])
  
     return res.status(204).json()
  }

  const updateAnuncio = async (req, res) => {
    const {id} = req.query;
    const {titulo, precio, descripcion, estado} = req.body;
    try {
      const data = await pool.query("UPDATE anuncio SET titulo = ($1), precio = ($2), descripcion = ($3), estado = ($4) WHERE id_anuncio = ($5)", [titulo, precio, descripcion, estado, id])
      
      return res.status(200).json(data)
    } catch(error){
        console.error(error.message);
    }
  }
    
