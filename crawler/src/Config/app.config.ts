import { config } from 'dotenv';
import { join } from 'path';
import * as Joi from 'joi';

const environment = process.env.NODE_ENV?.trim() || 'development';

const dir = environment === 'development' ? join(__dirname, '../../.env.development') : join(__dirname, '../../.env');

config({ path: dir });

const schema = Joi.object()
  .keys({
    DATABASE_URL: Joi.string().required(),
    HEADLESS_STATUS: Joi.string().required(),
    NODE_ENV: Joi.string().required(),
    REDIS_URL: Joi.string().required(),
    MONGODB_URL: Joi.string().required(),
    DOMAIN: Joi.string().required(),
    AMQP_URL: Joi.string().required(),
    FRONTEND_URL: Joi.string().required(),
    APP_NAME: Joi.string().required(),
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
  DATABASE_URL,
  HEADLESS_STATUS,
  NODE_ENV,
  REDIS_URL,
  MONGODB_URL,
  DOMAIN,
  AMQP_URL,
  FRONTEND_URL,
  APP_NAME,
} = envVars;
