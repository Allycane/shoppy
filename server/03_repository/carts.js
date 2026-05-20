import pool from "../db/connection.js";

// export const getCartsItem = async() => {
//     const sql = ``;
//     const [resultItem] = await pool.execute(sql, []);
//     console.log(resultItem);
//     // return resultItem;
// }

export const getFindItem = async(cartItem) => {
    const {pid, size, userId} = cartItem;
    const sql = `select cid from cart where pid = ? and id = ? and size = ?`;
    const [rows] = await pool.execute(sql, [pid, userId, size]);
    return rows[0]; // rows = [{cid : 189}] / rows = [{cid : undefined}]
}

/**
 * 기존 카트 수량 업데이트
 */
export const getQtyUpdate = async (cid) => {
    const sql = `UPDATE cart SET qty = qty + 1 WHERE cid = ?`;
    const [rows] = await pool.execute(sql, [cid]);
    return rows;
}

/**
 * 새로운 카트 생성
 */
export const getCartItem = async(cartItem) => {
    const {pid, size, qty, userId} = cartItem;
    const sql = `insert into cart(size, qty, pid, id, cdate) values(?, ?, ?, ?, now())`;
    const [rows] = await pool.execute(sql, [size, qty, pid, userId]);
    return rows;
}

export const getCount = async(userId) => {
    const sql = `SELECT sum(qty) AS count FROM cart WHERE id = ?`;
    const [rows] = await pool.execute(sql, [userId]);
    return rows[0];
}

export const getList = async (userId) => {
    const sql = `SELECT * FROM view_cartlist WHERE id = ?`;
    const [rows] = await pool.execute(sql, [userId]);
    return rows;
}