import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { getHours } from 'date-fns';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppoitmentsRepository')
    private appoitmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequestDTO): Promise<IResponse> {
    const appointments = await this.appoitmentsRepository.findByDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      },
    );

    const hourStart = 8;

    const hourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = hourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => appointment.date.getHours() === hour,
      );

      return { hour, available: !hasAppointmentInHour };
    });

    return availability;
  }
}
