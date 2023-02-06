import {
    Injectable,
    CanActivate,
    ExecutionContext,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const user = {
    name:'John Doe',
    roles:['user']
    }

    const role = this.reflector.get<string>('roles', context.getHandler());
   
  if(!role){
    return true;
  }
 
  if(!user.roles.includes(role)){
    return false;
  }
  
  return true;

  }
}