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
  logging: console.debug,
  dialectOptions: {
    connectTimeout: 60000, // Adjust connection timeout
  },
  hooks: {
    beforeConnect: (config) => {
      console.log(
        `Attempting to connect to mysql://${config.username}:${config.password.replace(/.+/, '*****')}@${config.host}:${config.port}/${config.database}\n as mysql://<username>:<password>@<host>:<port>/<database>`,
      );
    },
    afterConnect: (connection) => {
      console.log(
        `Authorized to MySQL ${connection['authorized'] ? 'Successfully' : 'Failed'}!`,
      );
    },
    beforeDisconnect: () => {
      // console.log('Disconnecting from MySQL...');
    },
  },
};
