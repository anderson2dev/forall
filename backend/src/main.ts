import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseFormat } from './infrastructure/commons/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // set filters
  app.useGlobalFilters();
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('FOR_ALL API')
    .setDescription('FOR_ALL API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ResponseFormat],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
