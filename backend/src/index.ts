import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from './middleware/sessionMiddleware';
import { AccountType } from './enumTypes';
import {
  accountController,
  houseController,
  orderController,
  ratingController,
} from './controllers';
import authRouter from './routes/auth';
import { handleErrorResp } from './utils';
import path from 'path';
// import { pictureCollector } from './utils/pictureCollector';

declare module 'express-session' {
  interface SessionData { account: { id: string, type: AccountType } }
}

console.log('started');

dotenv.config();

const api = express();
api.use('/accountImages', express.static(path.join(__dirname, '../public/accountImages')));
api.use('/houseImages', express.static(path.join(__dirname, '../public/houseImages')));

const port = process.env.BACKEND_PORT ?? 4000;

api.use(express.json());
api.use(bodyParser.json());
api.use(cookieParser());
api.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
api.use(session());

api.use('/accounts', accountController);
api.use('/houses', houseController);
api.use('/orders', orderController);
api.use('/ratings', ratingController);
api.use('/auth', authRouter);

api.use((_req, res) => {
  handleErrorResp(res, null, 404, 'No matching endpoint was found.', 'failure');
});

// here would be something like cron.schedule() and the pictureCollector would run there
// pictureCollector()

api.listen(port, () => console.log(
  `[${new Date().toISOString()}] House Catalogue Backend is listening on port ${port}`,
));
