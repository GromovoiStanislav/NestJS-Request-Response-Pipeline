import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { AuthenticationMiddleware } from './middleware/authentication.middleware';
//import { AuthGuard } from './guards/auth.guard';
//import { LoggingInterceptor } from './interceptors/logging.interceptor';
//import { FreezePipe } from './pipes/freeze.pipe';
//import { HttpExceptionFilter } from './filters/http-exeception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(new AuthenticationMiddleware()) //без DI
  //app.useGlobalGuards(new AuthGuard()) //без DI
  //app.useGlobalInterceptors(new LoggingInterceptor()) //без DI
  //app.useGlobalPipes(new FreezePipe()) //без DI
  //app.useGlobalFilters(new HttpExceptionFilter()) //без DI

  await app.listen(3000);
}
bootstrap();
