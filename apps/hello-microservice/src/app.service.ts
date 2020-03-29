import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LOREM_SERVICE_TOKEN, MATH_SERVICE_TOKEN } from './app.constant';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @Inject(MATH_SERVICE_TOKEN)
    private readonly mathService: ClientProxy,
    @Inject(LOREM_SERVICE_TOKEN)
    private readonly loremService: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.mathService.connect();
      await this.loremService.connect();
    } catch (e) {
      console.log(e);
    }
  }

  async getSum(numbers: number[]): Promise<number> {
    return await this.mathService.send('sum', numbers).toPromise();
  }

  async getLorem(): Promise<string> {
    return await this.loremService.send('lorem', '').toPromise();
  }
}
