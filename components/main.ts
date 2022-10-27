import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AuthGuard } from './auth/authentication/auth-guard';
import { JwtService } from './auth/authentication/jwt-helper';
import { TypeOrmFilter } from './exception-handler';
import { MainModule } from './main.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { RolesGuard } from './auth/authorization/rbac/roles.guard';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    }),
  );
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Gadget')
    .setDescription('Gadget API description')
    .setVersion('1.0')
    .addTag('APIs')
    .addBearerAuth({ type: 'apiKey', name: 'Authorization', in: 'header' })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // NOTE: this condition can be set from envs
  if (true) {
    const reflector = app.get(Reflector);
    app.useGlobalGuards(new AuthGuard(reflector, new JwtService()));
    app.useGlobalGuards(new RolesGuard(reflector));
  }
  app.useGlobalFilters(new TypeOrmFilter());
  await app.listen(3000);
}
bootstrap();
