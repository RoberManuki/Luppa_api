import { container } from 'tsyringe';

import './providers';

import IAnalysisRepository from '@modules/analysis/repositories/IAnalysisRepository';
import AnalysisRepository from '@modules/analysis/infra/typeorm/repositories/AnalysisRepository';

container.registerSingleton<IAnalysisRepository>(
  'AnalysisRepository',
  AnalysisRepository,
);
