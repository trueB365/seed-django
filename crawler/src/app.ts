import express from 'express';
import { createServer } from 'http';
import logger from './Config/logger.config';
import { videoExtractor } from './Modules';
import kill from 'kill-port';
import cron from 'node-cron';

const app: express.Application = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const res = await kill(Number(PORT), 'tcp');
    logger.debug(res);
  } catch (err) {
    logger.error(err);
  }

  server.listen(PORT, async () => {
    logger.info('App running on port: ' + PORT);
    cron.schedule('* 59 * * * *', async (now) => {
      try {
        await videoExtractor();
      } catch (error) {
        console.log(error);
      }
    });
  });
};

startServer().then(() => logger.info('App is starting'));
