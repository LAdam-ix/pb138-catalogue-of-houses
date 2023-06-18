import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session from './middleware/sessionMiddleware';
import cors from "cors";
import cookieParser from 'cookie-parser';
import { AccountType } from "./enumTypes";
import {
  accountController, 
  // houseController,
  orderController,
  ratingController,
} from "./controllers";
import authRouter from './routes/auth';
import { handleErrorResp } from './utils';

declare module 'express-session' {
  interface SessionData { account: { id: string, type: AccountType } }
}

console.log("started")

dotenv.config();

const api = express();

const port = process.env.BACKEND_PORT ?? 4000;

api.use(express.json());
api.use(bodyParser.json());
api.use(cookieParser());
api.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
api.use(session());


api.use("/accounts", accountController);
// api.use("/houses", houseController);
api.use("/orders", orderController);
api.use("/ratings", ratingController);
api.use('/auth', authRouter);


api.use((_req, res) => {
  handleErrorResp(res, null, 404, 'No matching endpoint was found.', 'failure');
});

api.listen(port, () =>
  console.log(
    `[${new Date().toISOString()}] House Catalogue Backend is listening on port ${port}`
  ));
