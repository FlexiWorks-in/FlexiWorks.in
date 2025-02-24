import mongoose from 'mongoose';

import config from '../config';
import logger from '../logger';

const connectionString = config.db.url
  ?.replace('<USERNAME>', config.db.username || '')
  .replace('<DB_PASSWORD>', config.db.password || '');

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${connectionString}/${config.db.name}`
    );
    logger.info(`Connected to DB: ${connectionInstance.connection.host}`);
  } catch (err) {
    logger.error('DB Connection Error: ', err);
    process.exit(1);
  }
};

export default connectDB;
