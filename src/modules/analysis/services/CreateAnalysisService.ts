import Analyze from '@modules/analysis/infra/typeorm/entities/Analyze';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import IAnalysisRepository from '../repositories/IAnalysisRepository';

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

    if (!analyze) {
      throw new AppError('Erro na criação da análise!');
    }

    return analyze;
  }
}

export default CreateAnalysisService;
