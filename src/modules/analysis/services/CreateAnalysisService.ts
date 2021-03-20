import Analyze from '@modules/analysis/infra/typeorm/entities/Analyze'; // To study => DDD
import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICreateAnalyzeDTO from '@modules/analysis/dtos/ICreateAnalyzeDTO';
import AppError from '@shared/errors/AppError';
import IAnalysisRepository from '../repositories/IAnalysisRepository';
import IDocumentsRepository from '../repositories/IDocumentsRepository';

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

  public async execute({
    fullName,
    cpf,
    documents,
  }: ICreateAnalyzeDTO): Promise<Analyze> {
    const findAnalyzeDoc = await this.analysisRepository.findPerDocument(
      documents,
    );

    if (findAnalyzeDoc) {
      throw new AppError('Esse documento já foi analisado!');
    }

    // map?
    await this.documentsRepository.create(documents);

    const analyze = await this.analysisRepository.create({
      fullName,
      cpf,
      documents,
    });

    return analyze;
  }
}

export default CreateAnalysisService;
