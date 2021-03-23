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
    const min = 0;
    const max = 3;

    // 'status' sendo gerado de forma aleatória
    const statusValues = ['valid', 'fraud', 'error'];

    const analyze = await this.analysisRepository.create({
      fullName,
      cpf,
      // Não precisamos instanciar o repositório de Document devido ao 'cascade: true' no relacionamento
      documents: links.map(link => ({
        link,
        status: statusValues[min + Math.floor((max - min) * Math.random())],
      })),
    });

    return analyze;
  }
}

export default CreateAnalysisService;
