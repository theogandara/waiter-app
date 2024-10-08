import { Request, Response } from 'express';
import { Category } from '../../app/Category';

export async function listCategories(req: Request, res: Response) {
  try {
    const categories = await Category.find();

    return res.json(categories);
  } catch {
    return res.sendStatus(500);
  }
}
