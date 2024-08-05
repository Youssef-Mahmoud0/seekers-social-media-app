import db from '../config/database.mjs'

class SessionModel {

    static async getSession(userId, token) {
        const [result] = await db.execute(
            `SELECT * FROM sessions WHERE userId = ? AND token = ?`,
            [userId, token]
        )
        return result[0];
    }

    static async createSession(userId, token, expired_at) {
        const [result] = await db.execute(
            `INSERT INTO sessions(userId, token, expired_at) Values (?, ?, ?)`,
            [userId, token, expired_at]
        );
        return result;
    }

    static async deleteSession(userId, token) {
        const [result] = await db.execute(
            `DELETE FROM sessions WHERE userId = ? AND token = ?`,
            [userId, token]
        );
        return result;
    }

}

export default SessionModel;