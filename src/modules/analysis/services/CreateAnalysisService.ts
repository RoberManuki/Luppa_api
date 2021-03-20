import Analyze from '@modules/analysis/infra/typeorm/entities/Analyze'; // To study => DDD
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
    // alguma regra de negócio

    const analyze = await this.analysisRepository.create({
      fullName,
      cpf,
      documents,
    });

    return analyze;
  }
}

export default CreateAnalysisService;
