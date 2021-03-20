import { Request, Response } from 'express';

import CreateAnalysisService from '@modules/analysis/services/CreateAnalysisService';
import { container } from 'tsyringe';

export default class AnalysisController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { fullName, cpf, documents } = request.body;

    console.log(request.body);

    const createAnalysis = container.resolve(CreateAnalysisService);

    const analysis = await createAnalysis.execute({
      fullName,
      cpf,
      documents,
    });

    const analysisReturn = {
      analysisId: analysis.id,
    };

    return response.json(analysisReturn);
  }
}
