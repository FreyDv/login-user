import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerModule } from '@nestjs/swagger';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './db/sequelizeModuleOptions';

@Module({
  imports: [SwaggerModule, SequelizeModule.forRoot(sequelizeConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
