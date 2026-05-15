import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRouter from './01_routes/products.js';

dotenv.config();

const PORT = process.env.SERVER_PORT || 9000;
// 객체 생성
const app = express();

// 미들웨어 -> 공통적인 작업
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended: false}));

// 라우팅
app.use('/products', productsRouter);

// 실행
app.listen(PORT, () => {
    console.log(`${PORT}포트 서버 실행 완료!!`);
})