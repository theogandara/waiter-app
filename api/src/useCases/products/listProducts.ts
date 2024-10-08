import { Request, Response } from 'express';
import { Product } from '../../app/Product';

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await Product.find();

    return res.json(products);
  } catch {
    return res.sendStatus(500);
  }
}
