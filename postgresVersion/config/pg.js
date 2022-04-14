import pg from 'pg'
import debug from 'debug'
const log = ('livro_nodejs:config:pg')
const pool = new pg.Pool({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    database: 'livro_nodejs',
    max: 5
})
pool.on('error', (err) => log('postgress error:', err))
export default pool