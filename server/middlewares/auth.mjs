import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SessionModel from '../models/sessionModel.mjs';


const defaultSalt = 10;
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, defaultSalt);
}

export const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const generateToken = (payload) =>{
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3m' });
}
// refresh token: 

export const verifyToken =  (token) =>{
    try {
        const decoded =  jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }catch(error) {
        console.error("Inside Verify Token: ", error);
        return null;
    }
}

export const verifyUser = async (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token)
        return response.status(401).json({ error: 'Access denied' });
    try {
        const userLoginInfo = verifyToken(token);
        console.log(userLoginInfo);
        if (!userLoginInfo)
            return response.status(401).send({message: "Unauthorized"});
        
        const session = await SessionModel.getSession(userLoginInfo.userId, token);
        console.log(session);
        if(!session || new Date(session.expired_at) < new Date())
            return response.status(401).send({message: "Unauthorized"});

        request.userLoginInfo = userLoginInfo;
        if (request.path === '/logout') {
            request.token = token;
        }

        next();
    } catch (error) {
        response.status(401).json({ error: 'Invalid token' });
    }

}

