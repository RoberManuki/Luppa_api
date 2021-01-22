import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindByMonthFromProviderDTO from '../dtos/IFindByMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByMonthFromProvider(
    data: IFindByMonthFromProviderDTO,
  ): Promise<Appointment[]>;
}
