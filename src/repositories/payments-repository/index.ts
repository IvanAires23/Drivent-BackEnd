import { prisma } from '@/config';
import { DataCard, PaymentParams } from '@/protocols';

async function postPayments(ticketId: number, dataCard: DataCard, userId: number) { }

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(ticketId: number, params: PaymentParams) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...params,
    },
  });
}

export default { findPaymentByTicketId, createPayment };
