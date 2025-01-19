import { Logger } from 'winston';
import config from '../config';
import devLogger from './devLogger';

const defaultLogger: Logger = devLogger();

let logger: Logger = defaultLogger;

// if (config.nodeEnv === 'production') {
//   console.log('production');
// }

if (config.nodeEnv === 'development') {
  logger = devLogger();
}

export default logger;
