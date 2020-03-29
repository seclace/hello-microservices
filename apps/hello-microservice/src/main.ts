import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configsService = await app.get<ConfigService>(ConfigService);
  const mathServiceHost = configsService.get<string>('MATH_SERVICE_HOST');
  const mathServicePort = +configsService.get<number>('MATH_SERVICE_PORT');
  const appPort = +configsService.get<number>('APP_PORT');

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: mathServiceHost,
      port: mathServicePort,
    }
  });

  await app.listen(appPort);
}
bootstrap();
