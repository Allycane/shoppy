import express from 'express';
import * as controller from '../02_controller/products.js';

const router = express.Router();

router.get('/', controller.getAllProducts);
router.get('/:pid', controller.getProduct);

export default router;