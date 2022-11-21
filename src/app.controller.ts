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
import { AppService } from './app.service';
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
    body.test = 32;//вызовится ошибка т.к. Body "заморожен"
  }

  @Get('error')
  throwError() {
    throw new InternalServerErrorException();
  }
}
