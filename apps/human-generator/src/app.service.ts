import { Injectable } from '@nestjs/common';
import { name, address } from 'faker';
import { Human } from './interface/human.interface';

@Injectable()
export class AppService {
  async generateHuman(): Promise<Human> {
    return {
      name: name.firstName(0),
      address: address.streetAddress(true),
      age: Math.floor(Math.random() * 20 + 20),
    };
  }
}
