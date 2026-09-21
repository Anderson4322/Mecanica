import postgres from 'postgres';
const sql = postgres('postgres://postgres:user@localhost:5432/mecanica');
// const sql = postgres('postgresql://postgres.pjwugxkkyvmuocnkqwum:EwpKAxROndDEwUIM@aws-0-us-west-2.pooler.supabase.com:5432/postgres');
export default sql;