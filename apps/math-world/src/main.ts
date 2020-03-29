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
        host: 'localhost',
        port: 9001,
      }
    }
  );
  await app.listen(() => console.log('Math World microservice is listening'));
}
bootstrap();
