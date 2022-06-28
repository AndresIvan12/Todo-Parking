import {Pool} from "pg";

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'modestmodest88',
  port: '5432',
  database: 'todoparking'
});

export {pool};
