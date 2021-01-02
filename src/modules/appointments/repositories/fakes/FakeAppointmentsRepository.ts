import { v4 } from 'uuid';
import { isEqual } from 'date-fns';

import Appointment from '../../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../IAppointmentsRepository';
import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';


class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentDateExists = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return appointmentDateExists;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

}

export default FakeAppointmentsRepository;
