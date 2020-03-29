import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MATH_SERVICE_TOKEN } from './app.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
      envFilePath: ['.dev.env', '.env'],
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: MATH_SERVICE_TOKEN,
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('MATH_SERVICE_HOST');
        const port = +configService.get<number>('MATH_SERVICE_PORT');
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host, port },
        })
      },
      inject: [ConfigService],
    },
    AppService,
  ],
})
export class AppModule {}
