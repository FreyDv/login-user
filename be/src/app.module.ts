import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerModule } from '@nestjs/swagger';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './db/sequelizeModuleOptions';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [SwaggerModule, SequelizeModule.forRoot(sequelizeConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    await this.sequelize.authenticate();
  }
}
