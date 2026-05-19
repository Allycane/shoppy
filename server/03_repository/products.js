import pool from '../db/connection.js';

/**
 * 전체 상품 조회
 */
export const getAllProducts = async () => {
    const sql = `SELECT pid, concat('images/', image) AS image FROM product`;
    const [result] = await pool.execute(sql, []);
    // console.log('repository products --->', result);
    return result;
};

/**
 * 특정 상품 조회
 */
export const getProduct = async (pid) => {
    const sql = `select 
	        p.pid, p.name, p.price, p.info, p.rate, 
			concat('/images/', p.image) AS image, p.img_list as imgList,
            json_object("title_en", pd.title_en, 
						"title_ko" ,pd.title_ko, 
                        "list", pd.list) as detailInfo,
			json_array(pd.title_en, pd.title_ko) as testArray
		from product p inner join product_detailinfo pd on p.pid = pd.pid and p.pid = ?`;
    const [result] = await pool.execute(sql, [pid]);
    return result[0];
}

/**
 * 상품 리뷰 정보
 */
// export const getReview = async () => {

// }

/**
 * 상품 정보 QnA
 */
export const getQna = async (pid) =>{
    const sql = `select
                        qid, 
                        title, 
                        content, 
                        is_complete as isComplete, 
                        is_lock as isLock, 
                        pid, 
                        cdate
	            from product_qna where pid = ?`;
    const [qna] = await pool.execute(sql, [pid]);
    return qna;
}