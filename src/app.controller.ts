import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  UseFilters,
} from '@nestjs/common';
import { Req, SetMetadata } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { SetParams, SetParam } from './decorators/set-param.decorator';
import { ParamGuard1, ParamGuard2, ParamGuard3 } from './guards/param.guard';
import { FreezePipe } from './pipes/freeze.pipe';
//import { AuthGuard } from './guards/auth.guard';
//import { LoggingInterceptor } from './interceptors/logging.interceptor';
////import { HttpExceptionFilter } from './filters/http-exeception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //@UseGuards(AuthGuard) // Можно на уровне endpoint с DI
  //@UseInterceptors(LoggingInterceptor) // Можно на уровне endpoint с DI
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  //@UseFilters(HttpExceptionFilter)// Можно на уровне endpoint с DI
  //@UsePipes(FreezePipe) // Можно на уровне всего endpoint с DI (в нашем случае для всех аргументов)
  //или только на уровне Body (без DI):
  examplePost(@Body(new FreezePipe()) body: any) {
    body.test = 32; //вызовится ошибка т.к. Body "заморожен"
  }

  @Get('error')
  throwError() {
    throw new InternalServerErrorException();
  }

  //@UseGuards(ParamGuard1('Parameter 1'))
  //@UseGuards(ParamGuard2('Parameter 2'))
  //@SetMetadata('param', 'Parameter 3')
  @SetParams('Parameter 3')
  //@SetParam('Parameter 3')
  @UseGuards(ParamGuard3)
  @Get('param')
  getParamToGuard(@Req() req) {
    return req.locals;
  }
}
