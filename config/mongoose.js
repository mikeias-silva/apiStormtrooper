import debug from 'debug'
import mongoose from 'mongoose'
import config from 'config'
import dotenv from 'dotenv/config'


const log = debug('livro_nodejs:config:mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', (err) => log('Mondogb Error:', err))

export default mongoose