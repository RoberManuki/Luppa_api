import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindByMonthFromProviderDTO from '../dtos/IFindByMonthFromProviderDTO';
import IFindByDayFromProviderDTO from '../dtos/IFindByDayFromProviderDTO';
import IFindByDateDTO from '../dtos/IFindByDateDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(data: IFindByDateDTO): Promise<Appointment | undefined>;
  findByMonthFromProvider(
    data: IFindByMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findByDayFromProvider(
    data: IFindByDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
