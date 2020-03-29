import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { Human } from './interface/human.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('generate-human')
  async generate(): Promise<Human> {
    return this.appService.generateHuman();
  }
}
