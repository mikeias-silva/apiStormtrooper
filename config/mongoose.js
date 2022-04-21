import debug from 'debug'
import mongoose from 'mongoose'
import config from 'config'


const log = debug('livro_nodejs:config:mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection.on('error', (err) => log('Mondogb Error:', err))

mongoose.check = async () => {
    let result = { name: 'mongo' }
    try {
        const data = await db.stats()
        console.log("OI");
        result.ok = data.ok === 1
        result.db = data.db
    } catch (error) {
        result.ok = false
        result.message = error.message
    }
    return {
        name: 'mongo',
        ...result
    }
}

export default mongoose