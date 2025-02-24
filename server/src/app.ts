import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';
import { apiLogger, errorHandler } from './middlewares';

import commentRouter from './routes/comment.routes';

const app = express();

app.use(cors({ origin: config.corsOrigin, credentials: true }));

app.use('/public', express.static('public'));

app.use(apiLogger);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ limit: '16kb', extended: true }));
app.use(cookieParser());

import userRouter from './routes/user.routes';
import projectRouter from './routes/project.routes';

app.use('/api/v1/user', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/comments', commentRouter);

app.use(errorHandler);

export { app };
