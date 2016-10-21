module.exports = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  secret: 'tajnyKlic',
  authExpiration: 7 * 24 * 60 * 60,
};
