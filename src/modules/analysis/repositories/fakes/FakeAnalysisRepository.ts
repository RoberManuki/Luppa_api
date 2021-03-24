import ICreateAnalyzeDTO from '@modules/analysis/dtos/ICreateAnalyzeDTO';
import Analyze from '../../infra/typeorm/entities/Analyze';
import IAnalysisRepository from '../IAnalysisRepository';

class FakeAnalysisRepository implements IAnalysisRepository {
  private analysis: Analyze[] = [];

  public async create({
    fullName,
    cpf,
    documents,
  }: ICreateAnalyzeDTO): Promise<Analyze> {
    const analyze = new Analyze();

    Object.assign(analyze, {
      analysisId: 'aaa',
      fullName,
      cpf,
      analyzedAt: new Date(),
      documents,
    });

    this.analysis.push(analyze);

    return analyze;
  }

  public async findAllAnalysis(): Promise<Analyze[]> {
    const analysis = this.analysis.map(analyze => analyze);

    return analysis;
  }

  public validateDoc(): string {
    const statusValues = ['valid', 'fraud', 'error'];

    return statusValues[Math.floor(Math.random() * statusValues.length)];
  }
}

export default FakeAnalysisRepository;
