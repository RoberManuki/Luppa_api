import { Router } from 'express';
// import { celebrate, Joi, Segments } from 'celebrate';

import AnalysisController from '../controllers/AnalysisController';

const analysisRouter = Router();
const analysisController = new AnalysisController();

analysisRouter.post('/', analysisController.create);

export default analysisRouter;
