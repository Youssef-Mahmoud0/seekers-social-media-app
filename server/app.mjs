import express from 'express';
import authRouter from './routes/authRouter.mjs';
import postRouter from './routes/postRouter.mjs'
import commentRouter from './routes/commentRouter.mjs'
import likeRouter from './routes/likeRouter.mjs'
import friendshipRouter from './routes/friendshipRouter.mjs'
import { verifyUser } from './middlewares/auth.mjs';


import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(authRouter);


app.use(verifyUser);
app.use(postRouter);
app.use(commentRouter);
app.use(likeRouter);
app.use(friendshipRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`app running on port ${port}`)
});
