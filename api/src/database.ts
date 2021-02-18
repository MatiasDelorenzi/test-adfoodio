import { createPool } from 'mysql2/promise'

export async function connect() {
  const connection = await createPool({
    host: '172.18.0.1',
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10
  })
  return connection
}
