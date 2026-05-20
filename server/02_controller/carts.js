import * as repository from '../03_repository/carts.js';
/**
 * 장바구니 추가
 */

export const getCartsItem = async (req, res, next) => {
    // 카트 아이템(pid, size)이 동일한 경우 : update 수량(qty) 1 증가
    // 카트 아이템이 없는 경우 : insert 

    // 1. 카트 아이템 확인
    const findResult = await repository.getFindItem(req.body);
    let result = null;
    if(findResult)  {
        // 수량 업데이트
        result = await repository.getQtyUpdate(findResult.cid);
    }
    else {
        // 추가 insert
        result = await repository.getCartItem(req.body);
    }
    res.json({"isAdd" : result.affectedRows});
}

/**
 * 로그인 시 장바구니 아이템 수 불러오기
 */
export const getCount = async (req, res, next) => {
    const itemCount = await repository.getCount(req.body.userId);
    // console.log('itemCount ---->', itemCount);
    res.json(itemCount);
}
/**
 * 장바구니 리스트
 */
export const getList = async (req, res, next) => {
    const list = await repository.getList(req.body.userId);
    // console.log(req.body.userId);
    res.json(list);
}