import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetSumQueryDto } from './dto/get-sum-query.dto';
import { ParseNumbersArrayPipe } from './pipe/parse-numbers-array.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('sum')
  async getSum(
    @Query(new ParseNumbersArrayPipe()) query: GetSumQueryDto,
  ): Promise<number> {
    return this.appService.getSum(query.numbers);
  }

  @Get('lorem')
  async getLorem(): Promise<string> {
    return this.appService.getLorem();
  }
}
