import { SetMetadata } from '@nestjs/common';

export const SetManyParams = (...params: string[]) =>
  SetMetadata('param', params);

export const SetArrayParam = (param: string[]) => SetMetadata('param', param);

export const SetOneParam = (param: string) => SetMetadata('param', param);
