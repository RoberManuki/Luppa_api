import { getRepository, Repository } from 'typeorm';

import Analyze from '@modules/analysis/infra/typeorm/entities/Analyze';
import IAnalysisRepository from '@modules/analysis/repositories/IAnalysisRepository';

interface IRequest {
  fullName: string;
  cpf: string;
}

class AnalysisRepository implements IAnalysisRepository {
  private ormRepository: Repository<Analyze>;

  constructor() {
    this.ormRepository = getRepository(Analyze);
  }

  public async create({ fullName, cpf }: IRequest): Promise<Analyze> {
    const analyze = this.ormRepository.create({
      fullName,
      cpf,
    });

    await this.ormRepository.save(analyze);

    return analyze;
  }

  public async findPerDocument(
    documents: string,
  ): Promise<Analyze | undefined> {
    const analyzeDocument = this.ormRepository.findOne({
      where: { documents },
    });

    return analyzeDocument;
  }
}

export default AnalysisRepository;
