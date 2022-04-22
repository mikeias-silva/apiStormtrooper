// const express = require('express'); // sem module type
import express from 'express'; //com module type
import cors from 'cors';
import routes from '../routes/index.js';
import dotenv from 'dotenv/config'
import compression from 'compression'
import helmet from 'helmet';
const app = express();


app.use(compression({ threshold: 0 }))
app.use(cors());
app.disable('X-Powered-By')
app.use(helmet())

//Faz o parse da requisição pare receber em json
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


// if (app.get('env') === 'development') {
//     app.use(express.static(path.join(__dirname, 'public')));
// }

app.use(routes)

export default app;