import express from 'express';
import cors from 'cors';

import authRouter from './routes/authRouter.mjs';
import postRouter from './routes/postRouter.mjs'
import commentRouter from './routes/commentRouter.mjs'
import friendshipRouter from './routes/friendshipRouter.mjs'
import userRouter from './routes/userRouter.mjs';
import { verifyUser } from './middlewares/auth.mjs';
import {sequelize} from './config/sequelize.mjs';


import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    allowedHeaders: ['Authorization', 'Content-Type']
}));

app.use('/uploads/profile-pictures', express.static('uploads/profile-pictures'));
app.use('/uploads/posts-media', express.static('uploads/posts-media'));

app.use(authRouter);



app.use(verifyUser); 
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(friendshipRouter);

Object.values(sequelize.models).forEach((model) => {
    if (model.associate) {
      model.associate(sequelize.models); // Pass the models object to each associate method
    }
});


const port = process.env.PORT || 4000;
sequelize.sync().then(() => {  
    console.log('Database synced');    
    app.listen(port, () => { console.log(`app running on port ${port}`) });
}).catch((err) => {
    console.log('Error syncing database', err);
});
