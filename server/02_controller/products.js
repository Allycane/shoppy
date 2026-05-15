import * as repository from '../03_repository/products.js';

/**
 * 전체 상품 조회
 */
export const getAllProducts = async (req, res, next) => {
    const products = await repository.getAllProducts();
    res.json(products);
};

/**
 * 특정 상품 조회
 */
export const getProduct = async (req, res, next) => {
    // console.log('pid', req.params.pid);
    
    const product = await repository.getProduct(req.params.pid);
    // console.log('p------->', product);
    res.json(product);
}