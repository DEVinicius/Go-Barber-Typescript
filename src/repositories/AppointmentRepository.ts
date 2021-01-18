import { isEqual } from 'date-fns';
import Appointment from '../models/Appointments';
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Appointment)
class AppointmentRepository {

    public findByDate(date: Date): Appointment | null {
        const findAppointmentInSameDate = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );

        return findAppointmentInSameDate || null;
    }
}

export default AppointmentRepository;
