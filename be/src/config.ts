import * as process from 'node:process';

const jWTRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{32,}$/;

const {
  PORT,
  DB_HOST,
  DB_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  JWT_SECRET,
  JWT_EXPIRES,
} = process.env;

if (jWTRegExp.test(JWT_SECRET)) {
  throw new Error(
    'JWT_SECRET required and should be 32 characters length with at least one digit, lowercase letter, uppercase letter are present ',
  );
}

export const config = {
  port: +(PORT || 3000),
  jwt: {
    secret: JWT_SECRET,
    expiresIn: JWT_EXPIRES || '60s',
  },
  debug: process.env.DEBUG === 'true',
  db: {
    host: DB_HOST || 'db',
    port: +(DB_PORT || 3306),
    name: MYSQL_DATABASE,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
  },
};
