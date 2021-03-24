import { Router } from 'express';
// import { celebrate, Joi, Segments } from 'celebrate';

import AnalysisController from '../controllers/AnalysisController';

const analysisRouter = Router();
const analysisController = new AnalysisController();

analysisRouter.post('/', analysisController.create);

analysisRouter.get('/', analysisController.find);
analysisRouter.get('/list', analysisController.index);

export default analysisRouter;
