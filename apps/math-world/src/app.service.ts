import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSum(nums: number[]): number {
    let result = 0;
    for (const n of nums) {
      result += n;
    }
    return result;
  }
}
