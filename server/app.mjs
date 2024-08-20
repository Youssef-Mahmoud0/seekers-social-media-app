import express from 'express';
import authRouter from './routes/authRouter.mjs';
import postRouter from './routes/postRouter.mjs'
import commentRouter from './routes/commentRouter.mjs'
import friendshipRouter from './routes/friendshipRouter.mjs'
import { verifyUser } from './middlewares/auth.mjs';
// import setupAssociations from './models/definitions/associations.mjs';
import {sequelize} from './config/sequelize.mjs';


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
