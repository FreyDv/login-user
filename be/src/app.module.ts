import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { SwaggerModule } from '@nestjs/swagger';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './db/sequelizeModuleOptions';
import { Sequelize } from 'sequelize-typescript';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    SwaggerModule,
    SequelizeModule.forRoot(sequelizeConfig),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    await this.sequelize.authenticate();
  }
}
