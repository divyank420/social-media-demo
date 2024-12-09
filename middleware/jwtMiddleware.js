import { jwt_secrat } from "../config/config.js";
import jwt from 'jsonwebtoken';

const authMiddleware = (req,res,next) => {
    const authHeader =  req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token,jwt_secrat)
        req.user = decoded;
        next();
    } catch (error) {
        
        res.status(403).send({ message: 'Forbidden',error:error });
    }
}
export default authMiddleware;