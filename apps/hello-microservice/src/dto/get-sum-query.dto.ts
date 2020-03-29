import { IsArray } from 'class-validator';

export class GetSumQueryDto {
  @IsArray()
  numbers: number[];
}
