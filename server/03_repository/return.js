import pool from "../db/connection.js";;

export const getReturn = async () => {
    const sql = `select rid, title, description, list from product_return`;
    const [returnData] = await pool.execute(sql, []);
    // console.log(returnData[0]);
    return returnData[0];
}