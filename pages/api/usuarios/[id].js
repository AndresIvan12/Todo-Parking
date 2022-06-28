import {pool} from '../../../config/db'; 

export default async function Handler(req, res){

  switch(req.method){
    case 'GET':
      return await getUsuario(req, res)
    case 'DELETE':
      return await deleteUsuario(req, res)
    case 'PUT':
      return await updateUsuario(req, res)
    default:
      break;
  }
}

   
  const getUsuario = async (req, res) => {
    const {id} = req.query;
    
    const {rows} = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [id])

    return res.status(200).json(rows[0])
  }

  const deleteUsuario = async (req, res) => {
    const {id} = req.query

    try{
      const {rows} = await pool.query('SELECT * FROM anuncio WHERE id_usuario = $1', [id])

      rows.map( async anuncio =>{
        const resultDeleteImagenAnuncio = await pool.query('DELETE FROM imagenanuncio WHERE id_anuncio = $1', [anuncio.id_anuncio])
      })
      
      const resultDeleteAnuncios = await pool.query('DELETE FROM anuncio WHERE id_usuario = $1', [id])
      const resultDeleteUsuario = await pool.query('DELETE FROM usuario WHERE id_usuario = $1', [id])

      return res.status(200).json(resultDeleteUsuario)
    }catch{
      return res.status(400).json("Usuario no eliminado")
    }
    
    
  
     
  }

  const updateUsuario = async (req, res) => {
    const {id} = req.query;
    const {nombre, apellido, direccion, telefono} = req.body;

    

    try {
      const data = await pool.query("UPDATE usuario SET direccion = ($1), telefono = ($2), nombre = ($3), apellido = ($4) WHERE id_usuario = ($5)", [direccion, telefono, nombre, apellido, id])
      
      return res.status(200).json(data)
    } catch(error){
        console.error(error.message);
    }
  }
    
