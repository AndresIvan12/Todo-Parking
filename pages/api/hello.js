import {pool} from '../../config/db';

export default async function handler(req, res) {

  const {rows} = await pool.query('SELECT * FROM anuncio')

  console.log(rows);
  res.status(200).json(rows);
}
