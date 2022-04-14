// const express = require('express'); // sem module type
import express from 'express'; //com module type
import cors from 'cors';
import routes from '../routes/index.js';
const app = express();

app.use(cors());

//Faz o parse da requisição pare receber em json
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(routes)

export default app;