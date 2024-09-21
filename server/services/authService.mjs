import UserModel from '../models/userModel.mjs'
import SessionModel from '../models/sessionModel.mjs';
import Session from '../models/definitions/Session.mjs';
import { hashPassword, verifyPassword, generateToken } from '../middlewares/auth.mjs'

class AuthService {
    static async signup(user) {
        const { username, email } = user
        // console.log(username, email)
        
        const existingUser = await UserModel.findUser(username, email);

        if (existingUser) {
            throw new Error('Username already exists');
        }

        const hashedPassword = await hashPassword(user.password);
        await UserModel.create({ ...user, password: hashedPassword });
    }

    static async login(usernameOrEmail, password) {
        const user = await UserModel.findByUsernameOrEmail(usernameOrEmail);
        if (!user || !(await verifyPassword(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        // edit it to use the model again other time

        const session = await Session.create({
            userId: user.userId,
            expired_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 )
        });
        
        const token = generateToken( {userId:user.userId, sessionId: session.sessionId} );

        session.token = token;
        await session.save();

        // end of the part to edit

        // const result = await SessionModel.createSession(user.userId, token);
        if(session === null){
            throw new Error('Failed to create session');
        }
        
        const loginData = {
            token: token,
            user: {
                userId: user.userId,
                name: user.name,
                profilePicture: user.profilePicture,
                email: user.email,
                bio: user.bio
            }
        }

        return loginData; 
    }


    static async logout(userId, token) {
        const result = await SessionModel.deleteSession(userId, token);
        if (result.affectedRows === 0) {
            throw new Error('Failed to delete session');
        }
    }

}

export default AuthService;