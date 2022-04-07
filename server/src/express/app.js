import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import api from './api';

const getApp = () => {
  const app = express();

  app.use(
    helmet(),
    bodyParser.json({ limit: '1mb' }),
    bodyParser.urlencoded({ extended: true }),
  );

  app.use('/api', api);

  // in development, this won't be used as webpack-dev-server sits above
  if (process.env.NODE_ENV === 'production') {
    // TODO: fix webapp to align with what this generates when built
    app.get('*', (req, res) => {
      res.send(fs.readFileSync(path.join(__dirname, '../../dist/webapp')));
    });
  }

  return app;
};

export default getApp;
