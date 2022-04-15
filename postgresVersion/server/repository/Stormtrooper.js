import db from '../../config/pg.js'
import redis from '../../config/redis.js'

const sql = `SELECT st.id, st.name, st.nickname, p.name as patent from stormtroopers st join patents p ON p.id = st.id_patent`


const Stormtrooper = {
    list(q = '', page = 1) {
        const DEFAULT_LIMIT = 11
        const skip = Math.abs(page - 1) * DEFAULT_LIMIT
        const where = q ? `WHERE st.name ILIKE '%'||$1::text||'%'` : `WHERE $1::text=''`
        return db.query(`${sql} ${where} LIMIT ${DEFAULT_LIMIT} OFFSET ${skip}`, [q])
            .then(result => result.rows)
    },
    byId(id) {
        return db.query(`${sql} WHERE st.id = $1::int`, [id])
            .then(result => result.rows && result.rows[0])
            .then(result => {
                const key = `trooper:${id}`
                const value = JSON.stringify(result);
                redis.setAsync(key, value).catch(e => console.log(e))
                return result
            });
    },
    async create(data) {
        const sql = `INSERT INTO stormtroopers(name, nickname, id_patent)
        VALUES($1::text, $2::text, $3::int)
        RETURNING id`;
        const params = [
            data.name, data.nickname, data.id_patent
        ]
        const result = await db.query(sql, params)
        return await this.byId(result.rows[0].id)

    },
    updateById(id, data) {
        const sql = `UPDATE stormtroopers 
        SET
        name = $1::text, 
        nickname = $2::text,
        id_patent = $3::int
        WHERE id = $4::int`
        const params = [data.name, data.nickname, data.id_patent];
        return db.query(sql, params)
    },
    deleteById(id) {
        const sql = `DELETE FROM stormtroopers WHERE id = $1::int`
        return db.query(sql, [id])
    }
}

export default Stormtrooper;