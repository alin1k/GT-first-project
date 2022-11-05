import express from 'express';
import { getLatestProducts } from '../controllers/home-page.js';
const router = express.Router();

router.get('/', getLatestProducts);

export default router;