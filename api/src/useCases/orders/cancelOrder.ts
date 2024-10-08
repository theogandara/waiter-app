import { Request, Response } from 'express';
import { Order } from '../../app/Order';

export async function cancelOrder(req: Request, res: Response) {
  const { orderId } = req.params;
  const order = await Order.findByIdAndDelete({ _id: orderId });

  if (!order) return res.sendStatus(404);

  return res.status(200).json(order);
}
