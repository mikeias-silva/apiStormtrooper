import express from "express";
import fs from 'fs/promises'
import path, { dirname } from 'path'
import { fileURLToPath } from "url";
import mongo from '../config/mongoose.js'

const routes = new express.Router()

routes.get('/version', async (request, response) => {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const str = await fs.readFile(path.join(__dirname, '../package.json'))
    const pkg = JSON.parse(str.toString())
    response.json({
        applicationName: pkg.name,
        versionRelease: pkg.version,
        uptime: process.uptime(),
        nodeVersion: process.version
    })
})

routes.get('/status', (request, response) => response.end('PONG'))

routes.get('/status/complete', async (request, response, next) => {
    const checks = [await mongo.check()]
    const ret = {
        ok: checks.every(item => item.ok),
        checks,
    }
    response.json(ret)
})

export default routes
