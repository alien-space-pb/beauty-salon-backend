import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';


import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/** Middleware para autenticação (Token), todas as totas que estiverem abaixp desse Middleware globar, vai obedecer a regra. também podemos lhe definir como middlware local, passando ele na rora */
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.get('/appointments', AppointmentController.index)
routes.post('/appointments', AppointmentController.store)

routes.get('/schedule', ScheduleController.index);


routes.post('/files', upload.single('file'), FileController.store)


export default routes;
