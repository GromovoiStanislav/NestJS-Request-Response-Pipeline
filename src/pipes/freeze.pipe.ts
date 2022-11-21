import { Injectable, Logger, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FreezePipe implements PipeTransform {
  private readonly logger = new Logger(FreezePipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('FreezePipe running...');//5  до endpoint
    Object.freeze(value);
    return value;
  }
}
