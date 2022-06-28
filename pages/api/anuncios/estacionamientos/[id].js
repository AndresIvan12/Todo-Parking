import {pool} from '../../../../config/db'; 

export default async function Handler(req, res){

  switch(req.method){
    case 'GET':
      return await getEstacionamiento(req, res)
    case 'DELETE':
      return await deleteEstacionamiento(req, res)
    case 'PUT':
      return await updateEstacionamiento(req, res)
    default:
      break;
  }
}

   
  const getEstacionamiento = async (req, res) => {
    const {id} = req.query

    const {rows} = await pool.query('SELECT * FROM estacionamiento WHERE id_estacionamiento = $1', [id])

    return res.status(200).json(rows[0])
  }

  const deleteEstacionamiento = async (req, res) => {
    const {id} = req.query
  
     const result = await pool.query('DELETE FROM estacionamiento WHERE id_estacionamiento = $1', [id])
  
     return res.status(204).json()
  }

  const updateEstacionamiento = async (req, res) => {
    const {id} = req.query;
    const {superficie_total, tipo, acceso, cobertura, gastos_comunes, direccion, latitud, longitud} = req.body;
    try {
      const data = await pool.query("UPDATE estacionamiento SET superficie_total = ($1), tipo = ($2), acceso = ($3), cobertura = ($4),  gastos_comunes = ($5), direccion = ($6), latitud = ($7), longitud = ($8) WHERE id_estacionamiento = ($9)", [superficie_total, tipo, acceso, cobertura, gastos_comunes, direccion, latitud, longitud, id])
      
      return res.status(200).json(data)
    } catch(error){
        console.error(error.message);
    }
  }
    
