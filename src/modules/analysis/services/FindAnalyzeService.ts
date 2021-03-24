/* eslint-disable no-return-await */
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAnalysisRepository from '../repositories/IAnalysisRepository';
import IDocumentsRepository from '../repositories/IDocumentsRepository';
import IAnalyzeResponseDTO from '../dtos/IAnalyzeResponseDTO';
import Analyze from '../infra/typeorm/entities/Analyze';
import Document from '../infra/typeorm/entities/Document';

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

  // eslint-disable-next-line consistent-return
  public async execute(
    analyze_id: string,
  ): Promise<IAnalyzeResponseDTO | undefined> {
    const analyzeCached = await this.cacheProvider.recover<Analyze>(
      `analysis-list:${analyze_id}`,
    );

    const documentsCached = await this.cacheProvider.recover<Document[]>(
      `documents-list:${analyze_id}`,
    );

    if (analyzeCached && documentsCached) {
      const responseCached = {
        analysisId: analyzeCached.id,
        fullName: analyzeCached.fullName,
        cpf: analyzeCached.cpf,
        analyzedAt: analyzeCached.analyzed_at,
        documents: documentsCached,
      };

      console.log('Cached return');
      return responseCached as IAnalyzeResponseDTO;
    }

    if (!analyzeCached || !documentsCached) {
      const documents = await this.documentsRepository.findAllDocuments();

      if (!documents) {
        throw new AppError('Documentos não foram encontrados.');
      }

      const analysis = await this.analysisRepository.findAllAnalysis();

      if (!analysis) {
        throw new AppError('Análises não foram encontradas.');
      }

      const analyzeSelected = analysis.find(
        analyze => analyze.id === analyze_id,
      );

      if (!analyzeSelected) {
        throw new AppError('Análise não encontrada.');
      }

      const selectedDocs = documents.filter(
        document => analyzeSelected.id === document.analyze_id,
      );

      const response = {
        analysisId: analyzeSelected.id,
        fullName: analyzeSelected.fullName,
        cpf: analyzeSelected.cpf,
        analyzedAt: analyzeSelected.analyzed_at,
        documents: selectedDocs,
      };

      await this.cacheProvider.save(
        `analysis-list:${analyze_id}`,
        analyzeSelected,
      );

      // Salvar Docs em cache --> Desabilitado por não estar funcionando corretamente
      // Para testar, basta descomentar as linhas 92~98
      // comportamento --> Retorna apenas o último documento salvo em cache para tal 'analyze_id'

      // selectedDocs.map(
      //   async doc =>
      //     await this.cacheProvider.save(
      //       `documents-list:${doc.analyze_id}`,
      //       doc,
      //     ),
      // );

      console.log('Database return');
      return response as IAnalyzeResponseDTO;
    }
  }
}
