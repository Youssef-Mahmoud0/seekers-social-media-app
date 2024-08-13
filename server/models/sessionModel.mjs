import Session from "./definitions/Session.mjs";

class SessionModel {

    static async getSession(userId, token) {
        const session = await Session.findOne({
            where: {
                userId: userId,
                token: token
            }
        })

        return session;
    }

    static async createSession(userId, token, expired_at) {
        const result = await Session.create({
            userId: userId,
            token: token,
            expired_at: expired_at
        });

        return result;
    }

    static async deleteSession(userId, token) {
        const result = await Session.destroy({
            where: {
                userId: userId,
                token: token
            }
        });
        return result;
    }
}

export default SessionModel;