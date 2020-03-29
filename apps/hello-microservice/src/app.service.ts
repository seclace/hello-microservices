import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HUMAN_GENERATOR_SERVICE_TOKEN, LOREM_SERVICE_TOKEN, MATH_SERVICE_TOKEN } from './app.constant';
import { Human } from './interface/human.interface';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @Inject(MATH_SERVICE_TOKEN)
    private readonly mathService: ClientProxy,
    @Inject(LOREM_SERVICE_TOKEN)
    private readonly loremService: ClientProxy,
    @Inject(HUMAN_GENERATOR_SERVICE_TOKEN)
    private readonly humanGeneratorService: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.mathService.connect();
      await this.loremService.connect();
      await this.humanGeneratorService.connect();
      console.log('All services connected successfully')
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

  async getRandomHuman(): Promise<Human> {
    return await this.humanGeneratorService.send('generate-human', '').toPromise();
  }
}
