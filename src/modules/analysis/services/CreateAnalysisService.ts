import { format } from 'date-fns';
import Analyze from '@modules/analysis/infra/typeorm/entities/Analyze'; // To study => DDD
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAnalysisRepository from '../repositories/IAnalysisRepository';

interface IRequest {
  fullName: string;
  cpf: string;
  documents: Document[];
}

@injectable()
class CreateAnalysisService {
  constructor(
    @inject('AnalysisRepository')
    private analysisRepository: IAnalysisRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    fullName,
    cpf,
    documents,
  }: IRequest): Promise<Analyze> {
    // const findAppointmentSameDate = await this.appointmentsRepository.findByDate(
    //   { date: appointmentDate, provider_id },
    // );

    // if (findAppointmentSameDate) {
    //   throw new AppError('Duplicated appointment!');
    // }

    const analyze = await this.analysisRepository.create({
      fullName,
      cpf,
      documents,
    });

    // await this.cacheProvider.invalidate(
    //   `provider-appointments:${provider_id}:${format(
    //     appointmentDate,
    //     'yyyy-M-d',
    //   )}`,
    // );

    return analyze;
  }
}

export default CreateAnalysisService;
