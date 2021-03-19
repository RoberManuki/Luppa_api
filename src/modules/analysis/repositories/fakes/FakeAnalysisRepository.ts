import { v4 } from 'uuid';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IFindByDayFromProviderDTO from '@modules/analysis/dtos/IFindByDayFromProviderDTO';
import IFindByDateDTO from '@modules/analysis/dtos/IFindByDateDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';
import IAnalysisRepository from '../IAnalysisRepository';
import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';
import IFindByMonthFromProviderDTO from '../../dtos/IFindByMonthFromProviderDTO';

class FakeAnalysisRepository implements IAnalysisRepository {
  private appointments: Appointment[] = [];

  public async findByDate({
    date,
    provider_id,
  }: IFindByDateDTO): Promise<Appointment | undefined> {
    const appointmentDateExists = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );

    return appointmentDateExists;
  }

  public async findByMonthFromProvider({
    provider_id,
    year,
    month,
  }: IFindByMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findByDayFromProvider({
    provider_id,
    year,
    month,
    day,
  }: IFindByDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day,
    );

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAnalysisRepository;
