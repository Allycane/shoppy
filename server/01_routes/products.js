import express from 'express';
import * as controller from '../02_controller/products.js';

const router = express.Router();

router.get('/', controller.getAllProducts);

router.get('/:pid', controller.getProduct);
router.get('/:pid/qna/:pid', controller.getQna);

router.get('/review', controller.getReview);

export default router;