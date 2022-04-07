import 'dotenv/config';
import getApp from './express/app';
import log from './log';

const start = () => {
  const app = getApp();

  // other setup steps here
  // database connection/migrations/etc

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    log.info(`🏃 Running on ${port}...`);
  });
};

start();
