import * as process from 'node:process';

const { PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

export const config = {
  port: +(PORT || 3000),
  debug: process.env.DEBUG === 'true',
  db: {
    host: DB_HOST || 'lb',
    port: +(DB_PORT || 3306),
    name: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
  },
};
