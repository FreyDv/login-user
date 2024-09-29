import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { SwaggerModule } from '@nestjs/swagger';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './db/sequelizeModuleOptions';
import { Sequelize } from 'sequelize-typescript';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SwaggerModule,
    SequelizeModule.forRoot(sequelizeConfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    await this.sequelize.authenticate();
  }
}
