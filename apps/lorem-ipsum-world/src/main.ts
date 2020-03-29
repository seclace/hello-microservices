import * as dotenv from 'dotenv';
dotenv.config({ path: '.dev.env' });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      logger: ['debug', 'warn', 'error', 'log', 'verbose'],
      transport: Transport.REDIS,
      options: {
        url: process.env.LOREM_SERVICE_URL,
      }
    },
  );
  await app.listen(() => console.log('Lorem Ipsum microservice is listening'));
}
bootstrap();
