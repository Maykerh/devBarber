import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(AuthMiddleware);

routes.put('/users/:id', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

module.exports = routes;
