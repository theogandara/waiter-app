import { Request, Response } from 'express';
import { Order } from '../../app/Order';

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      return res.status(400).json({
        error: 'status must be one of these: WAITING, IN_PRODUCTION, DONE.',
      });
    }

    const order = await Order.findByIdAndUpdate(orderId, { status: status });

    if (!order) {
      return res.sendStatus(400);
    }

    return res.sendStatus(204);
  } catch {
    return res.sendStatus(500);
  }
}
