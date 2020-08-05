import express from 'express';
import ClassesControllers from './controllers/ClassesController'
import ConnectionController from './controllers/ConnectionsController';


const routes = express.Router();
const classesControllers = new ClassesControllers();
const connectionsController = new ConnectionController();


routes.post('/classes', classesControllers.create);
routes.get('/classes', classesControllers.index);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;