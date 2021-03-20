import { Request, Response } from 'express';

import CreateAanalysisService from '@modules/analysis/services/CreateAnalysisService';
import { container } from 'tsyringe';

export default class AnalysisController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { fullName, cpf, documents } = request.body;

    const createAnalysis = container.resolve(CreateAanalysisService);

    const analysis = await createAnalysis.execute({
      fullName,
      cpf,
      documents,
    });

    return response.json(analysis);
  }
}
