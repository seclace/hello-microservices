import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { GetSumQueryDto } from '../dto/get-sum-query.dto';

@Injectable()
export class ParseNumbersArrayPipe implements PipeTransform {
  transform(value: GetSumQueryDto, metadata: ArgumentMetadata): GetSumQueryDto {
    return {
      ...value,
      numbers: value.numbers.map(v => +v),
    };
  }
}
