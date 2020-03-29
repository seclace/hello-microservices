import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MATH_SERVICE_TOKEN } from './app.constant';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @Inject(MATH_SERVICE_TOKEN)
    private readonly mathService: ClientProxy,
  ) {}

  async getSum(numbers: number[]): Promise<number> {
    return await this.mathService.send('sum', numbers).toPromise();
  }

  async onApplicationBootstrap() {
    await this.mathService.connect();
  }
}
