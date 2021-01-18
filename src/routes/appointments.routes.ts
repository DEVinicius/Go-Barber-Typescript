import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRoute = Router();
const appointmentRepository = new AppointmentRepository();

appointmentRoute.get('/', (request, response) => {
    const appointments = appointmentRepository.all();

    return response.json(appointments);
});

appointmentRoute.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        // dating save
        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(
            appointmentRepository,
        );

        const appointment = createAppointment.execute({
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
