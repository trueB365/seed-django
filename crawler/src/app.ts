import express from 'express';
import { createServer } from 'http';
import cron from 'node-cron';
import logger from './Config/logger.config';
import { generateXvideosScrappingResult } from './Modules/Xvideos/xvideos.helper';

const app: express.Application = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

logger.info('MongoDB connection is established');
server.listen(PORT, async () => {
  logger.info('App running on port: ' + PORT);
  const result: any = await generateXvideosScrappingResult('https://xvideos.com/');
  console.log(result);
});
// cron.schedule('* 59 * * * *', async (now) => {
//   logger.info('[*] Repost Scheduler running');
// });
