import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { singleErrorMessageValidationPipe } from './pipes/single-error-message.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(singleErrorMessageValidationPipe);
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(3001);
}
bootstrap();
