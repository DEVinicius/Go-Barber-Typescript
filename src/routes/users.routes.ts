import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const usersRoute = Router();

usersRoute.post('/', async (request, response) => {
    try {
        return response.send();
    } catch (error) {
        // console.log(error);
        return response.status(400).json({ error: error.message });
    }
});

export default usersRoute;
