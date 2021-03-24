/* eslint-disable no-return-await */
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAnalysisRepository from '../repositories/IAnalysisRepository';
import IDocumentsRepository from '../repositories/IDocumentsRepository';
import IAnalyzeResponseDTO from '../dtos/IAnalyzeResponseDTO';

@injectable()
export default class FindAnalyzeService {
  constructor(
    @inject('AnalysisRepository')
    private analysisRepository: IAnalysisRepository,

    @inject('DocumentsRepository')
    private documentsRepository: IDocumentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(analyze_id: string): Promise<IAnalyzeResponseDTO> {
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

    const analyzeSelected = analysis.find(analyze => analyze.id === analyze_id);

    if (!analyzeSelected) {
      throw new AppError('Análise com esse ID não foi encontrada.');
    }

    const response = {
      analysisId: analyzeSelected.id,
      fullName: analyzeSelected.fullName,
      cpf: analyzeSelected.cpf,
      analyzedAt: analyzeSelected.analyzed_at,
      documents: documents.filter(
        document => analyzeSelected.id === document.analyze_id,
      ),
    };

    return response as IAnalyzeResponseDTO;
  }
}
