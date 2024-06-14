import { Sequelize } from 'sequelize-typescript';
import { PG_USERNAME, PG_PASSWORD, PG_DATABASE } from '../Config/app.config';
import logger from '../Config/logger.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../Config/sequelize.config');
logger.debug('tsc:events.schema.ts', JSON.stringify(config, null, 3));

const db = new Sequelize(PG_DATABASE, PG_USERNAME, PG_PASSWORD,  {
  ...config,
  models: [`${__dirname}/models/**/*.model.{js,ts}`],
  modelMatch: (filename: string, member: string) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});

export default db;
export { Op } from 'sequelize';
