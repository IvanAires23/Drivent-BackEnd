import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { paymentController } from '../controllers';

const paymentsRouter = Router();

paymentsRouter
    .all('/*', authenticateToken)
    .get('/', paymentController.getPaymentByTicketId)
    .post('/process', paymentController.paymentProcess);

export { paymentsRouter };
