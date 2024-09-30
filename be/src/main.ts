import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './config';
import { join } from 'path';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const documentConfig = new DocumentBuilder()
    .setTitle('Login-User API')
    .setDescription(
      'Demonstration of code style based on Login and authorized User CRUD',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);

  const outputPath = join(
    __dirname,
    '..',
    '..',
    'fe',
    'openapi',
    'openapi-schema.json',
  );

  writeFileSync(outputPath, JSON.stringify(document, null, 2));

  SwaggerModule.setup('docs', app, document);

  await app.listen(config.port);

  console.log(`Server start on ${config.port} port`);
}
bootstrap();
