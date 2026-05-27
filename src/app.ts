import express from 'express';
import {type Request, type Response} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {rateLimit} from 'express-rate-limit';
import {errorHandler} from "./middlewares/errorHandler.js";
import {corsOptions} from "./config/corsConfig.js";
import cookieParser from "cookie-parser";

// Import Routes
import authRoute from "./modules/Auth/auth.route.js";
import userRouter from "./modules/User/user.route.js";
import categoryRoute from "./modules/Category/category.route.js";
import walletRoute from "./modules/Wallet/wallet.route.js";
import incomeRouter from "./modules/Income/income.route.js";
import expenseRoute from "./modules/Expense/expense.route.js";

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(rateLimit());
app.use(cookieParser())
app.use(express.json());

app.get('/api/v1/health', (_req: Request, res: Response) => {
    res.status(200).json({status: 'success', message: 'Health Ok', uptime: process.uptime()});
    return;
})
// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRouter)
app.use('/api/v1/category', categoryRoute);
app.use("/api/v1/wallet", walletRoute);
app.use("/api/v1/income", incomeRouter);
app.use('/api/v1/expense', expenseRoute);

app.use(errorHandler)

export default app;