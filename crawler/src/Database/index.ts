import { Sequelize } from 'sequelize-typescript';
import { DATABASE_URL } from '../Config/app.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../Config/sequelize.config');
console.debug('tsc:events.schema.ts', JSON.stringify(config, null, 3));

const db = new Sequelize(DATABASE_URL, {
  ...config,
  models: [`${__dirname}/models/**/*.model.{js,ts}`],
  modelMatch: (filename: string, member: string) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});

export default db;
export { Op } from 'sequelize';
