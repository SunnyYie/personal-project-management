import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';

import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
// swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置 session
  app.use(
    session({
      secret: 'ppm-mcgdg-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1天
      },
    }),
  );

  // 全局错误拦截器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 注册全局日志拦截器
  const prismaService = app.get(PrismaService);
  app.useGlobalInterceptors(new LoggingInterceptor(prismaService));

  const config = new DocumentBuilder()
    .setTitle('个人项目管理系统API文档')
    .setDescription('个人项目管理系统API文档')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
