import {pool} from '../../../../config/db';

export default async function Handler(req, res){

  switch(req.method){
    case 'GET':
      return await obtenerEstacionamientos(req, res);
    case 'POST':
      return await guardarEstacionamiento(req, res);
      
  }

  
}

const obtenerEstacionamientos = async (req, res) => {
  const {rows} = await pool.query("SELECT * FROM estacionamiento;");

  return res.status(200).json(rows);
}

const guardarEstacionamiento = async (req, res) => {
  const {superficie_total, tipo, acceso, cobertura, gastos_comunes, direccion, latitud, longitud} = req.body;

  const resultEstacionamiento = await pool.query("INSERT INTO estacionamiento (superficie_total, tipo, acceso, cobertura, gastos_comunes, direccion, latitud, longitud) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
    superficie_total,
    tipo,
    acceso,
    cobertura,
    gastos_comunes,
    direccion,
    Number(latitud),
    Number(longitud)
  ])


  

  return res.status(200).json({});
}
