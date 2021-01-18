import { Router } from 'express';
import appointmentRoute from './appointments.routes';

const routes = Router();
routes.use('/appointments', appointmentRoute);

export default routes;
