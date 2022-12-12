import { SetMetadata } from '@nestjs/common';

export const SetParams = (...params: string[]) => SetMetadata('param', params);

export const SetParam = (param: string) => SetMetadata('param', param);
