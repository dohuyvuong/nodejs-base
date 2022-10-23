export const config = {
  environment: process.env.NODE_ENV || 'development',
  timezone: process.env.TZ,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: '1d',
};
