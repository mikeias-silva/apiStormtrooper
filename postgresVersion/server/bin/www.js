#!/usr/bin/env node
import app from '../app.js'
import debug from 'debug';
import cluster from 'cluster';
import os from 'os';
import { workerData } from 'worker_threads';
import { Server } from 'http';
import dns from 'dns';
import dnscache from 'dnscache'
import http from 'http';
import https from 'https';

http.globalAgent.keepAlive = true;
https.globalAgent.keepAlive = true;


dnscache({
    "enable": true,
    "ttl": 300,
    "cachesize": 1000
})


const cpus = os.cpus();

const log = debug('livro_nodejs:www')
const onWokerError = (code, signal) => log(code, signal)
if (cluster.isMaster) {
    cpus.forEach(_ => {
        const worker = cluster.fork()
        worker.on('error', onWokerError)
    })
    cluster.on('exit', (err) => {
        const newWorker = cluster.fork()
        newWorker.on('error', onWokerError);
        log('A new Worker Rises', newWorker.process.pid)
    })
    cluster.on('exit', (err) => log(err))
} else {
    const server = app.listen(3000, () => log('servidor iniciado'));
    server.on('error', (err) => log(err))
}
