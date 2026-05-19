import * as repository from '../03_repository/return.js';

export const getReturn = async (req, res, next) => {
    const returnData = await repository.getReturn();
    res.json(returnData);
};