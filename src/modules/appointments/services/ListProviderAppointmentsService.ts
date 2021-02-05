import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  month: number;
  day: number;
  year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequestDTO): Promise<Appointment[]> {
    // const cacheData = await this.cacheProvider.recover('aaa');

    // console.log(cacheData);

    const appointments = this.appointmentsRepository.findByDayFromProvider({
      provider_id,
      month,
      year,
      day,
    });

    await this.cacheProvider.save('aaa', 'bbb');

    return appointments;
  }
}
