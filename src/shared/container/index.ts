import { container } from 'tsyringe';

import './providers';

import IAnalysisRepository from '@modules/analysis/repositories/IAnalysisRepository';
import AnalysisRepository from '@modules/analysis/infra/typeorm/repositories/AnalysisRepository';

import IDocumentsRepository from '@modules/analysis/repositories/IDocumentsRepository';
import DocumentsRepository from '@modules/analysis/infra/typeorm/repositories/DocumentsRepository';

container.registerSingleton<IAnalysisRepository>(
  'AnalysisRepository',
  AnalysisRepository,
);

container.registerSingleton<IDocumentsRepository>(
  'DocumentsRepository',
  DocumentsRepository,
);
