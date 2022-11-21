import { MiddlewareConsumer, Module, NestModule, Scope, RequestMethod } from '@nestjs/common';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exeception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { RequestService } from './request.service';
import { AuthGuard } from './guards/auth.guard';
//import { FreezePipe } from './pipes/freeze.pipe';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },//Глобально с DI
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },//Глобально с DI
    // {
    //   provide: APP_PIPES,
    //   useClass: FreezePipe,
    // },//Глобально с DI
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },//Глобально с DI
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');//{path:'/path',method:RequestMethod.GET}
  }
}
