import { Router } from 'express';
import trooperRoutes from '../server/routes/trooper.js';
import createError from "http-errors";
import jwt from 'jwt-simple'
import moment from 'moment';
import config from "config";
import verifyId from '../server/middleware/verifyId.js'
import checkRoutes from './check.js'

const routes = new Router();


routes.get('/', (req, res) => res.send('Olá'))

routes.post('/login', (request, response, next) => {
    const { username, password } = request.body
    if (username === 'rebels' && password === '1138') {
        const token = jwt.encode({
            user: username,
            exp: moment().add(7, 'days').valueOf()
        }, config.get('jwtTokenSecret'))
        return response.json({ token })
    }
    next(createError(401, 'Unauthorized'))
})

const verifyJwt = (request, response, next) => {
    const token = request.query.token || request.headers['x-token'];
    if (!token) {
        return next(createError(401, 'Unauthorized'))
    }
    try {
        const decoded = jwt.decode(token, config.get('jwtTokenSecret'))
        const isExpired = moment(decoded.exp).isBefore(new Date())
        if (isExpired) {
            next(createError(401, 'Unauthorized'))
        } else {
            request.user = decoded.user
            next()
        }
    } catch (error) {
        error.status = 401
        return next(error)
    }
}

routes.use('/troopers', trooperRoutes)
routes.use('/checks', checkRoutes)


export default routes