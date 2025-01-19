import { app } from './app';
import connectDB from './db';
import config from './config';
import logger from './logger';

logger.info(config.nodeEnv);
connectDB()
  .then(() => {
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => logger.info('Server connection error: ', err));
