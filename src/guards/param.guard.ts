import {
  Injectable,
  CanActivate,
  ExecutionContext,
  mixin,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

/////////////////////////////////////////////////////////////
export const ParamGuard1 = (param: string): any => {
  class Guard implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      if (!request.locals) {
        request.locals = {};
      }
      request.locals = { param1: param };
      return true;
    }
  }

  const guard = mixin(Guard);
  return guard;
};

//////////////////////////////////////////////////////////////
export const ParamGuard2 = (param: string): any => {
  @Injectable()
  class Guard implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      if (!request.locals) {
        request.locals = {};
      }
      request.locals.param2 = param;
      return true;
    }
  }

  return Guard;
};

///////////////////////////////////////////////
@Injectable()
export class ParamGuard3 implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const param = this.reflector.get<string>('param', context.getHandler());

    const request = context.switchToHttp().getRequest();
    if (!request.locals) {
      request.locals = {};
    }
    request.locals.param3 = param;
    return true;
  }
}
