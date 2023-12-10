import { config } from 'dotenv';
import { join } from 'path';
import * as Joi from 'joi';

const environment = process.env.NODE_ENV?.trim() || 'development';

if (environment === 'development') {
  const dir = join(__dirname, '../../.env.development');
  config({ path: dir });
} else {
  config();
}

const schema = Joi.object()
  .keys({
    HEADLESS_STATUS: Joi.string().required(),
    NODE_ENV: Joi.string().required(),
    PG_USERNAME: Joi.string().required(),
    PG_PASSWORD: Joi.string().required(),
    PG_DATABASE: Joi.string().required(),
    PG_HOST: Joi.string().default("127.0.0.1").required(),
    PG_PORT: Joi.number().default(5432).required(),
  })
  .unknown();

const { value: envVars, error } = schema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env, { abortEarly: false });

if (error) {
  let missingArr = error.message.split('.');
  missingArr = missingArr.map((value: string) => {
    return value.trim();
  });
  console.debug(missingArr);
  throw new Error('Missing Environment Variables');
}

export const {
  PG_USERNAME,
  PG_PASSWORD,
  PG_DATABASE,
  PG_HOST,
  PG_PORT,
  HEADLESS_STATUS,
  NODE_ENV
} = envVars;
