import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const message = errors.map(
          (error) => Object.values(error.constraints)[0],
        )[0];
        return new BadRequestException(message);
      },
    }),
  );
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(3001);
}
bootstrap();
