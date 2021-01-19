import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRoute = Router();

appointmentRoute.use(ensureAuthenticated);

appointmentRoute.get('/', async (request, response) => {
    const appoitmentsRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appoitmentsRepository.find();

    return response.json(appointments);
});

appointmentRoute.post('/', async (request, response) => {
    try {
        const { providerId, date } = request.body;

        // dating save
        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            date: parseDate,
            providerId
        });

        return response.json({
            appointment,
        });
    } catch (error) {
        // console.log(error);
        return response.status(400).json({ error: error.message });
    }
});

export default appointmentRoute;
