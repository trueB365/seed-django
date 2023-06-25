import express from 'express';
import { createServer } from 'http';
import logger from './Config/logger.config';
import { videoExtractor } from './Modules';
import cron from 'node-cron';
//import { NODE_ENV } from './Config/app.config';

const app: express.Application = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  server.listen(PORT, async () => {
    logger.info('App running on port: ' + PORT);
    cron.schedule('* 59 * * * *', async (now) => {
      logger.info(`[*] Running crawler at ${now}`);
      try {
        await videoExtractor();
      } catch (error) {
        console.log(error);
      }
    });
  });
};

startServer().then(() => logger.info('App is starting'));
