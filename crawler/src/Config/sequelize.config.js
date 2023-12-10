// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
console.log('======', process.env.NODE_ENV, '=======');

const dir =
  environment.trim() === 'development'
    ? path.join(__dirname, '../../.env.development')
    : path.join(__dirname, '../../.env');
console.log(dir);
const result = dotenv.config({ path: dir });

if (result.error) {
  throw result.error;
}

const PG_HOST=process.env.PG_HOST
const PG_PORT=process.env.PG_PORT
const DATABASE_DIALECT = process.env.DATABASE_DIALECT;

const config = {
  [environment]: {
    host: PG_HOST || 'localhost',
    dialect: DATABASE_DIALECT || 'postgres',
    logging: environment.trim() === 'development' ? console.log : false,
    use_env_variable: 'DATABASE_URL',
    port: PG_PORT || 5432,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // }
  },
};

if (environment.trim() === 'production') {
  config[environment].ssl = true;
  config[environment].dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

module.exports = config[environment];
