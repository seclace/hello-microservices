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
      transport: Transport.TCP,
      options: {
        host: process.env.MATH_SERVICE_HOST,
        port: +process.env.MATH_SERVICE_PORT as number,
      }
    }
  );
  await app.listen(() => console.log('Math World microservice is listening'));
}
bootstrap();
