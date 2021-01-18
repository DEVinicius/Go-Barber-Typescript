import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRoute = Router();


appointmentRoute.get('/', (request, response) => {
    const appoitmentsRepository = getCustomRepository(AppointmentRepository);
    const appointments = appoitmentsRepository.find();

    return response.json(appointments);
});

appointmentRoute.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body;

        // dating save
        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            date: parseDate,
            provider,
        });

        return response.json({
            appointment,
        });
    } catch (error) {
        return response.status(400).json({ error: error.message() });
    }
});

export default appointmentRoute;
