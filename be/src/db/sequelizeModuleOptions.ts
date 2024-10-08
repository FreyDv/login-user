import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { config } from '../config';
import { UserModel } from '../user/entities/user.model';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  models: [UserModel],
  //TODO setup liquidise containers to up DB with migrations and remove synchronize, sync, autoLoadModelss
  synchronize: true,
  sync: { force: true },
  autoLoadModels: true,
  retryDelay: 1000,
  retry: {
    max: 5,
    timeout: 50,
  },
  ...(config.debug
    ? {
        logging: console.log,
        dialectOptions: {
          connectTimeout: 60000, // Adjust connection timeout
        },
        hooks: {
          beforeConnect: (config) => {
            console.log(
              `Attempting to connect to mysql://${config.username}:${config.password.replace(/.+/, '*****')}@${config.host}:${config.port}/${config.database} as mysql://<username>:<password>@<host>:<port>/<database>`,
            );
          },
          afterConnect: (connection) => {
            console.log(
              `Authorized to MySQL ${connection['authorized'] ? 'Successfully' : 'Failed'}!`,
            );
          },
        },
      }
    : {
        logging: false,
      }),
};
