import { Injectable } from '@nestjs/common';
import * as faker from 'faker';

@Injectable()
export class AppService {
  async getLorem(): Promise<string> {
    return faker.lorem.sentence(Math.floor(Math.random() * 20));
  }
}
