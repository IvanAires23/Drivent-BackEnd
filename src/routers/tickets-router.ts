import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketsController } from '@/controllers';
import { ticketsSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', ticketsController.getTicketTypes)
  .get('/', ticketsController.getTickets)
  .post('/', validateBody(ticketsSchema), ticketsController.createTicket);

export { ticketsRouter };
