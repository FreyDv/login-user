import * as process from 'node:process';

const { PORT } = process.env;

export const config = {
  port: PORT || 3000,
};
