import { Request, Response } from 'express';
import { Product } from '../../app/Product';

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete({ _id: productId });

    if (!product) return res.sendStatus(404);

    return res.status(200).json(product);
  } catch {
    return res.sendStatus(500);
  }
}
