import Analyze from '@modules/analysis/infra/typeorm/entities/Analyze'; // To study => DDD
import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAnalysisRepository from '../repositories/IAnalysisRepository';
import IDocumentsRepository from '../repositories/IDocumentsRepository';

interface IRequest {
  fullName: string;
  cpf: string;
  links: string[];
}

@injectable()
class CreateAnalysisService {
  constructor(
    @inject('AnalysisRepository')
    private analysisRepository: IAnalysisRepository,

    @inject('DocumentsRepository')
    private documentsRepository: IDocumentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ fullName, cpf, links }: IRequest): Promise<Analyze> {
    const analyze = await this.analysisRepository.create({
      fullName,
      cpf,
      // 'cascade: true' no relacionamento --> Não precisamos de repositório para Documents
      documents: links.map(link => ({
        link,
        status: this.analysisRepository.validateDoc(),
      })),
    });

    return analyze;
  }
}

export default CreateAnalysisService;
