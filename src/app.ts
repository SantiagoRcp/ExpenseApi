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

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(rateLimit());
app.use(cookieParser())
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({status: 'success', message: 'Health Ok', uptime: process.uptime()});
    return;
})
// Routes
app.use('/api/v1/auth', authRoute);

app.use(errorHandler)

export default app;