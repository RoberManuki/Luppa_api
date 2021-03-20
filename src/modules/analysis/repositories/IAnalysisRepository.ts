import Analyze from '../infra/typeorm/entities/Analyze';
import ICreateAnalyzeDTO from '../dtos/ICreateAnalyzeDTO';

export default interface IAnalysisRepository {
  create(data: ICreateAnalyzeDTO): Promise<Analyze>;
  findPerDocument(document: string): Promise<Analyze | undefined>;
}
