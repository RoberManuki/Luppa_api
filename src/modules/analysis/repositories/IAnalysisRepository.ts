import Analyze from '../infra/typeorm/entities/Analyze';

interface IRequest {
  fullName: string;
  cpf: string;
}

export default interface IAnalysisRepository {
  create(data: IRequest): Promise<Analyze>;
  findPerDocument(document: string): Promise<Analyze | undefined>;
}
