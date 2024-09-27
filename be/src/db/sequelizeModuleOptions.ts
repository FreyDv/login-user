import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { config } from '../config';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  models: [],
};
