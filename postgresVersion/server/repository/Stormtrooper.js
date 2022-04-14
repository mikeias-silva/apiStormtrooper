import mongoose from '../../config/mongoose.js'
import schema from '../schema/Stormtrooper.js'
import db from '../../config/pg.js'

const sql = `SELECT st.id, st.name, st.nickname, p.name as patent from stormtroopers st join patents p ON p.id = st.id_patent`


const Stormtrooper = {
    list(q = '', page = 3) {
        const DEFAULT_LIMIT = 5
        const skip = Math.abs(page - 1) * DEFAULT_LIMIT
        const where = q ? `WHERE st.name ILIKE '%'||$1::text||'%'` : `WHERE $1::text=''`

        const teste = db.query(`${sql} ${where} LIMIT ${DEFAULT_LIMIT} OFFSET ${skip}`, [q])
        .then(result => result.rows)
        console.log(teste);
        return teste
    },
    byId(id) {
        return db.query(`${sql} WHERE s.id = $1::int`, [id])
            .then(result => result.rows && result.rows[0])
    },
    create(data) {
        const sql = `INSERT INTO stormtroopers(name, nickname, id_patent)
        VALUES($1::text, $2::text, $3::int)
        RETURNING id`;
        const params = [
            data.name, data.nickname, data.id_patent
        ]
        return db.query(sql, params)
            .then(result => this.byId(result.rows[0].id))

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