import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Dystopian Travel Permit API')
    .setDescription(
      'A NestJS and TypeORM based backend API for managing travel permits, persons, vehicles, trailers, containers, cargoes and route-based authorization.',
    )
    .setVersion('1.0')
    .addTag('travel-permit')
    .addTag('person')
    .addTag('location')
    .addTag('vehicle')
    .addTag('trailer')
    .addTag('shipping-container')
    .addTag('cargo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
