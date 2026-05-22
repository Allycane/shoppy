import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

let approvalData = {};

/**
 * 1단계 - 카카오페이 결제 준비
 */
export const getReady = async(req, res, next) => {
    // console.log(req.body);
    const { orderId, userId, item_name, quantity, total_amount } = req.body;

    try{
        // 1. 카카오페이 결제 준비
        const readyURL = `https://open-api.kakaopay.com/online/v1/payment/ready`;
        const data = { 
            "cid": "TC0ONETIME",
		    "partner_order_id": orderId,
		    "partner_user_id": userId,
		    "item_name": item_name,
		    "quantity": quantity,
		    "total_amount": total_amount,
		    "vat_amount": 0,
		    "tax_free_amount": 0,
		    "approval_url": "http://192.168.7.74:9000/kakao/approve",
		    "fail_url": "http://192.168.7.74:3000/fail",
		    "cancel_url": "http://192.168.7.74:3000/cancel"
        };
        const config = {
            headers :{
                "Authorization": `SECRET_KEY ${process.env.KAKAO_SECRET_KEY}`,
                "Content-Type": "application/json"
            }
        };

        const readyResponse = await axios.post(readyURL, data, config);
        // console.log('readyResponse --->', readyResponse);

        const { tid, next_redirect_mobile_url } = readyResponse.data;
        // tid, orderId, userId - getApprove 호출 시 사용되므로, 저장 필요
        approvalData[orderId] = { tid, orderId, userId };

        res.json({ tid, next_redirect_mobile_url });
    }
    catch (error) {
        console.log('/kakao/ready :: Server Error --->', error);
    }
}

/**
 * 2단계 - 카카오페이 결제 실행
 */
export const getApprove = async(req, res, next) => {
    // req ==> 카카오페이 서버가 보내는 결제 요청
    // console.log(req.query);
    const {partner_order_id, pg_token} = req.query;
    const appSaveData = approvalData(partner_order_id);

    try {
        const approveURL = `https://open-api.kakaopay.com/online/v1/payment/approve`;
        const data = {
            "cid": "TC0ONETIME",
            "tid": appSaveData,
            "partner_order_id": appSaveData.orderId,
            "partner_user_id": appSaveData.userId,
            "pg_token": pg_token
        };
        const config = {
            headers : {
                "Authorization": `SECRET_KEY ${process.env.KAKAO_SECRET_KEY}`,
                "Content-Type": "application/json"
            }
        }
    
        const result = await axios.post(approveURL, data, config);
        console.log('payment result------->', result.data);
        /**
            결제 완료 후 자동으로 http://192.168.7.74:3000/success 페이지로 자동 이동!
            사설 IP는 그게 불가능하므로 15초 뒤에 QR을 false로 수저 
         * 
            res.redirect('http://192.168.7.74:3000/success');
         */
    }
    catch (error){
        console.log( 'KAKAO APPROVE :: ERROR --->', error );
    }
}