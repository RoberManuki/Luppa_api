/* eslint-disable no-return-await */
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import IAnalysisRepository from '../repositories/IAnalysisRepository';
import IDocumentsRepository from '../repositories/IDocumentsRepository';
import IAnalyzeResponseDTO from '../dtos/IAnalyzeResponseDTO';

@injectable()
export default class ListAnalysisService {
  constructor(
    @inject('AnalysisRepository')
    private analysisRepository: IAnalysisRepository,

    @inject('DocumentsRepository')
    private documentsRepository: IDocumentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<IAnalyzeResponseDTO[]> {
    // let analysis = await this.cacheProvider.recover<Analyze[]>(
    //   `analysis-list:${analyze_id}`,
    // );

    // await this.cacheProvider.save(
    //   `analysis-list:${analyze_id}`,
    //   classToClass(analysis),
    // );

    const analysis = await this.analysisRepository.findAllAnalysis();

    if (!analysis) {
      throw new AppError('Análises não foram encontradas.');
    }

    const documents = await this.documentsRepository.findAllDocuments();

    if (!documents) {
      throw new AppError('Documentos não foram encontrados.');
    }

    const list: IAnalyzeResponseDTO[] = [];

    analysis.map(analyze => {
      const listItem = {
        analysisId: analyze.id,
        fullName: analyze.fullName,
        cpf: analyze.cpf,
        analyzedAt: analyze.analyzed_at,
        documents: documents.filter(
          document => analyze.id === document.analyze_id,
        ),
      };
      list.push(listItem);
    });

    return list;
  }
}
