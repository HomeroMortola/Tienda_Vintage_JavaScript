import { addToCart, getCart, removeFromCart } from '../src/controllers/CartController.js';

export default async function handler(req, res) {
  if (req.method === 'GET') return getCart(req, res);
  if (req.method === 'POST') return addToCart(req, res);
  if (req.method === 'DELETE') return removeFromCart(req, res);
  res.status(405).send('Method Not Allowed');
}