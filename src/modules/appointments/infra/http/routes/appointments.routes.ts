import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// appointmentsRouter.get('/', ensureAuthenticated, async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post(
  '/',
  ensureAuthenticated,
  appointmentsController.create,
);

export default appointmentsRouter;
