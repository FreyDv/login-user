import * as process from 'node:process';

const { PORT, DB_HOST, DB_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } =
  process.env;

export const config = {
  port: +(PORT || 3000),
  debug: process.env.DEBUG === 'true',
  db: {
    host: DB_HOST || 'db',
    port: +(DB_PORT || 3306),
    name: MYSQL_DATABASE,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
  },
};
