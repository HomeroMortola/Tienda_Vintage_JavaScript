import { getProducts, createProduct } from '../src/controllers/ProductController.js';

export default async function handler(req, res) {
  if (req.method === 'GET') return getProducts(req, res);
  if (req.method === 'POST') return createProduct(req, res);
  res.status(405).send('Method Not Allowed');
}