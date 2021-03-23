import ICreateAnalyzeDTO from '../dtos/ICreateAnalyzeDTO';
import Analyze from '../infra/typeorm/entities/Analyze';

export default interface IAnalysisRepository {
  create(data: ICreateAnalyzeDTO): Promise<Analyze>;
}
