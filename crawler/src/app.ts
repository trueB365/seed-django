import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import logger from './Config/logger.config';
import { videoExtractor } from './Modules';
import cron from 'node-cron';
import { ThreeMovsService } from './Modules/3movs/3movs.service';
import { MONGODB_URL, DBAUTHSOURCE, DBUSER, DBPASS, DBNAME } from './Config/app.config';

const app: express.Application = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const startServer = async () => {
  logger.debug(
    JSON.stringify(
      {
        authSource: DBAUTHSOURCE,
        authMechanism: 'SCRAM-SHA-1',
        user: DBUSER,
        pass: '********',
        dbName: DBNAME,
      },
      null,
      2,
    ),
  );

  mongoose
    .connect(MONGODB_URL as string, {
      authSource: DBAUTHSOURCE,
      authMechanism: 'SCRAM-SHA-1',
      user: DBUSER,
      pass: DBPASS,
      dbName: DBNAME,
    })
    .then(async () => {
      logger.info('MongoDB connection is established');
      server.listen(PORT, () => logger.info('App running on port: ' + PORT));
      const threeMovsService = new ThreeMovsService();
      await threeMovsService.getVideoDetails();
    })
    .catch((err: any) => {
      logger.error(JSON.stringify(err, null, 2));
      logger.error('MongoDB connection error. Please make sure MongoDB is running.');
    });
};

startServer()
  .then(() => logger.info('App is Up and Running!'))
  .catch((error) => logger.error(error));
