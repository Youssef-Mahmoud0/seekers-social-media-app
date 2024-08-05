import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config();

const db = mysql.createPool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise();

export default db;