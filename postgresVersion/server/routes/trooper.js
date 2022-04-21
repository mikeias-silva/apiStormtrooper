import { Router } from 'express';
import createError from 'http-errors';
import redis from '../../config/redis.js';
import controller from '../controller/Stormtrooper.js';

const trooperRoutes = new Router();


const fromCache = (request, response, next) => {
    const key = `trooper:${request.params.id}`
    redis.getAsync(key).then(result => {
        if (!result) {
            return next()
        }
        response.send(JSON.parse(result))
    })
        .catch(_ => next())
}

trooperRoutes.get('/', controller.list)
trooperRoutes.get('/:id', verifyId, fromCache, controller.byId)
trooperRoutes.post('/', controller.create)
trooperRoutes.put('/:id', verifyId, controller.updateById)
trooperRoutes.delete('/:id', verifyId, controller.deleteById)

export default trooperRoutes