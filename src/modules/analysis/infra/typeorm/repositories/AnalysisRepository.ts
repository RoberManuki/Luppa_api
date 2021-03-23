import { getRepository, Repository } from 'typeorm';

import Analyze from '@modules/analysis/infra/typeorm/entities/Analyze';
import IAnalysisRepository from '@modules/analysis/repositories/IAnalysisRepository';
import ICreateAnalyzeDTO from '@modules/analysis/dtos/ICreateAnalyzeDTO';

class AnalysisRepository implements IAnalysisRepository {
  private ormRepository: Repository<Analyze>;

  constructor() {
    this.ormRepository = getRepository(Analyze);
  }

  public async create({
    fullName,
    cpf,
    documents,
  }: ICreateAnalyzeDTO): Promise<Analyze> {
    const analyze = this.ormRepository.create({
      fullName,
      cpf,
      documents,
    });

    await this.ormRepository.save(analyze);

    return analyze;
  }
}

export default AnalysisRepository;
