import { Router } from 'express';
import trooperRoutes from '../server/routes/trooper.js';

const routes = new Router();
routes.use('/troopers', trooperRoutes)

export default routes