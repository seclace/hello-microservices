import * as dotenv from 'dotenv';
dotenv.config({ path: '.dev.env' });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.HUMAN_GENERATOR_SERVICE_URL],
        queue: process.env.HUMAN_GENERATOR_SERVICE_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  await app.listen(() => console.log('People Generator microservice is listening'));
}
bootstrap();
