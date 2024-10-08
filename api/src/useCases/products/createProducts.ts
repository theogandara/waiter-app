import { Request, Response } from 'express';
import { Product } from '../../app/Product';

export async function createProducts(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      imagePath,
    });

    return res.status(201).json(product);
  } catch {
    return res.sendStatus(500);
  }
}
