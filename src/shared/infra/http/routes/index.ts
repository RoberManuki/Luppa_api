import { Router } from 'express';

import analysisRouter from '@modules/analysis/infra/http/routes/analysis.routes';

const routes = Router();

routes.use('/analysis', analysisRouter);

export default routes;
