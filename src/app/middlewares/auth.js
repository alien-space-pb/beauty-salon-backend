import jwt from 'jsonwebtoken';
/** Pega uma finção de callback e transform aem uam função qeu pode-se utilizar o async await */
import { promisify } from 'util'

import authConfig from '../../config/auth';

export default async ( req, res, next ) =>{
    const authHeader = req.headers.authorization;

    if( !authHeader ){
        return res.status(401).json({ error: 'Token not provided' })
    }

    const [, token ] = authHeader.split(' ');

    try{

        const decoded = await promisify(jwt.verify)(token, authConfig.secret);


        req.userId = decoded.id;

         return next();

    } catch (err){
        return res.status(401).json({ error: 'Token invalid' });
    }

};