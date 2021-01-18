import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import { getCustomRepository } from 'typeorm';
/**
 * Recebimento de informações
 * Trativa de erros
 * Acceso ao repositório
 */

interface RequestDTO {
    provider: string;
    date: Date;
}

/**
 * Dependency Inversion
 */

class CreateAppointmentService {
    public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
        const appoitmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appoitmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = appoitmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        await appoitmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
