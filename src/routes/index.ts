import { Router } from 'express';
import appointmentRoute from './appointments.routes';
import usersRoute from './users.routes';
import sessionsRoute from './sessions.routes';

const routes = Router();
routes.use('/appointments', appointmentRoute);
routes.use('/users', usersRoute);
routes.use('/sessions', sessionsRoute);

export default routes;
