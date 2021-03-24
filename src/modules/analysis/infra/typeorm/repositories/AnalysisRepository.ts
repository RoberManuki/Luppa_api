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

  public async findAllAnalysis(): Promise<Analyze[] | undefined> {
    const analysis = await this.ormRepository.find();

    return analysis;
  }

  // Ao tentar fazer essa função ser async, me deparei com erros de tipagem que 'quebraram' outros arquivos
  public validateDoc(): string {
    // 'status' sendo gerado de forma aleatória
    const statusValues = ['valid', 'fraud', 'error'];

    return statusValues[Math.floor(Math.random() * statusValues.length)];
  }
}

export default AnalysisRepository;
