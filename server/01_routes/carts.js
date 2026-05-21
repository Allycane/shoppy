import express from 'express';
import * as controller from '../02_controller/carts.js';

const router = express.Router();

router.post('/add', controller.getCartsItem);
router.post('/count', controller.getCount);
router.post('/list', controller.getList);
router.put('/qty', controller.getQtyUpdate);
router.delete('/delete', controller.getDelete);

export default router;