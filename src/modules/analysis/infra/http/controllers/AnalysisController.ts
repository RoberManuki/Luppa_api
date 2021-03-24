import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateAnalysisService from '@modules/analysis/services/CreateAnalysisService';
import ListAnalysisService from '@modules/analysis/services/ListAnalysisService';
import FindAnalyzeService from '@modules/analysis/services/FindAnalyzeService';

export default class AnalysisController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAnalysis = container.resolve(ListAnalysisService);

    const analysis = await listAnalysis.execute();

    return response.json(analysis);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { analyze_id } = request.body;

    const findAnalyze = container.resolve(FindAnalyzeService);

    const analyze = await findAnalyze.execute(analyze_id);

    return response.json(analyze);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { fullName, cpf, documents } = request.body;

    const createAnalysis = container.resolve(CreateAnalysisService);

    const analysis = await createAnalysis.execute({
      fullName,
      cpf,
      links: documents,
    });

    const analysisReturn = {
      analysisId: analysis.id,
    };

    return response.json(analysisReturn);
  }
}
