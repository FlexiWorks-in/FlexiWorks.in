import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const config = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || 5000,

  db: {
    url: process.env.MONGO_DB_URL || '',
    name: 'flexyWorks',
    username: process.env.DB_USER_NAME || '',
    password: process.env.DB_PASSWORD || '',
  },

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '1d',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',

  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
};

export default config;
