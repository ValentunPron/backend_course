import express from "express";
import 'dotenv/config'

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routers.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(cookieParser)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('hello')
});

app.listen(process.env.PORT || 3000, async () => {
    console.log('Server working', process.env.PORT);

    await connectToDatabase();
});

export default app