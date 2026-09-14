import postgres from 'postgres';
const sql = postgres('postgres://postgres:user@localhost:5432/mecanica');
export default sql;