import { Request, Response } from 'express';
import { Category } from '../../app/Category';

export async function deleteCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByIdAndDelete({ _id: categoryId });

    if (!category) return res.sendStatus(404);

    return res.status(200).json(category);
  } catch {
    return res.sendStatus(500);
  }
}
