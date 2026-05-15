import pool from '../db/connection.js';

/**
 * 전체 상품 조회
 */
export const getAllProducts = async () => {
    const sql = `SELECT pid, concat('images/', image) AS image FROM product`;
    const [result] = await pool.execute(sql, []);
    console.log('repository products --->', result);
    return result;
};

/**
 * 특정 상품 조회
 */
export const getProduct = async (pid) => {
    const sql = `select pid, name, price, info, rate,
                    concat('/images/', image) AS image, img_list as imgList from product where pid = ?`;
    const [result] = await pool.execute(sql, [pid]);
    return result[0];
}