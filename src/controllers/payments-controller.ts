import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  try {
    const { ticketId } = req.query
    const { userId } = req;

    const payment = await paymentsService.getPaymentByTicketId(userId, ticketId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    } else if (error.name === 'BAD_REQUEST') {
      return res.status(httpStatus.BAD_REQUEST).send(error)
    } else if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

async function paymentProcess(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId, cardData } = req.body;

  try {
    if (!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST);

    const payment = await paymentsService.paymentProcess(ticketId, userId, cardData);
    if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export const paymentController = { getPaymentByTicketId, paymentProcess }
