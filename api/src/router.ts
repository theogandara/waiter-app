import { Router } from 'express';

import multer from 'multer';
import path from 'node:path';

import { listCategories } from './useCases/categories/listCategories';
import { listProducts } from './useCases/products/listProducts';
import { listOrders } from './useCases/orders/listOrders';
import { createCategory } from './useCases/categories/createCategory';
import { createProducts } from './useCases/products/createProducts';
import { createOrders } from './useCases/orders/createOrders';
import { changeOrderStatus } from './useCases/orders/changeOrderStatus';
import { deleteCategory } from './useCases/categories/deleteCategory';
import { cancelOrder } from './useCases/orders/cancelOrder';
import { listProductsByCategory } from './useCases/categories/listProductsByCategory';
import { deleteProduct } from './useCases/products/deleteProduct';

export const router = Router();
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// ----- CATEGORY
router.get('/categories', listCategories);
router.post('/categories', createCategory);
router.get('/categories/:categoryId/products', listProductsByCategory);
router.delete('/categories/:categoryId', deleteCategory);

// ----- PRODUCTS
router.get('/products', listProducts);
router.post('/products', upload.single('image'), createProducts);
router.delete('/products/:productId', deleteProduct);

// ----- ORDERS
router.get('/orders', listOrders);
router.post('/orders', createOrders);
router.delete('/orders/:orderId', cancelOrder);
router.patch('/orders/:orderId', changeOrderStatus);
