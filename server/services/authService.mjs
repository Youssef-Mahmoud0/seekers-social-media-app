import UserModel from '../models/userModel.mjs'
import SessionModel from '../models/sessionModel.mjs';
import { hashPassword, verifyPassword, generateToken } from '../middlewares/auth.mjs'

class AuthService {
    static async signup(user) {
        const { username, email } = user
        // console.log(username, email)
        
        const existingUser = await UserModel.findUser(username, email);

        if (existingUser) {
            throw new Error('Username already exists.');
        }

        const hashedPassword = await hashPassword(user.password);
        await UserModel.create({ ...user, password: hashedPassword });
    }

    static async login(usernameOrEmail, password) {
        const user = await UserModel.findByUsernameOrEmail(usernameOrEmail);

        if (!user || !(await verifyPassword(password, user.password))) {
            throw new Error('Authentication failed! Invalid credentials.');
        }

        // create an empty session {sessionId}
        // token = {
            // userId: user.userId
            // sessionId: sessionId
        //}
        const token = generateToken( {userId:user.userId} );  // check this line


        const result = await SessionModel.createSession(user.userId, token, new Date(Date.now() + 1000 * 60 * 60));
        if(result === null){
            throw new Error('Failed to create session');
        }
        
        return token; 
    }


    static async logout(userId, token) {
        const result = await SessionModel.deleteSession(userId, token);
        if (result.affectedRows === 0) {
            throw new Error('Failed to delete session');
        }
    }

}

export default AuthService;