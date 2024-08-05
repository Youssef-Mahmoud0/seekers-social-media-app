import db from '../config/database.mjs'

class UserModel {
    //used when signing up to make sure no duplicate entries are made
    static async findUser(username, email) {
        const [ result ] = await db.execute(
            `SELECT * FROM users WHERE username = ? OR email = ?`,
            [username, email]
        );
        const user = result[0]       
        return user;
    }

    // used when loggingg in to adapt whether the user enters an email or a username
    static async findByUsernameOrEmail(usernameOrEmail) {
        const [ result, fields ] = await db.execute(
            `SELECT * FROM users WHERE username = ? OR email = ?`,
            [usernameOrEmail, usernameOrEmail]
        );
        const user = result[0]        
        return user;
    }
    
    static async create(user) {
        const [result] = await db.execute(
            `INSERT INTO users(username, email, password, first_name, last_name, bio) 
            VALUES(?, ?, ?, ?, ?, ?);`,
            [user.username, user.email, user.password, user.first_name, user.last_name, user.bio]
        );
        return result.insertId;
    } 

}

export default UserModel;