import express from 'express';
import * as controller from '../02_controller/kakao.js';

const router = express.Router();

router.post('/ready', controller.getReady); // front에서 결제하기 버튼을 입력했을 경우 연결됨
router.get('/approve', controller.getApprove);
// 카카오페이 서버에서 redirect를 통해 접속 / QR 인식 시 / 토큰, url 등이 넘어오기 때문에 get 방식으로 받는다

export default router;