import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config'
import Chalk from 'chalk'
import { Logger } from './common/libs/log4js/log4j.util'
import { logger } from './common/libs/log4js/logger.middleware'
import { TransformInterceptor } from './common/libs/log4js/transform.interceptor'
import { HttpExceptionsFilter } from './common/filters/http-exceptions-filter'
import { ExceptionsFilter } from './common/filters/exceptions-filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import express, { urlencoded, json } from 'express'
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'
import { StringUtils } from './utils'
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, // 是否允许跨域
  });

  const config = app.get(ConfigService)
  // 设置 api 访问前缀
  const prefix = config.get<string>('app.prefix')
  app.setGlobalPrefix(prefix)

   // swagger
  if (StringUtils.equalsIgnoreCase(process.env.NODE_ENV, 'development')) {
    const swaggerOptions = new DocumentBuilder().setTitle('接口文档').setDescription('接口文档').setVersion('1.0.0').addBearerAuth().build()
    const document = SwaggerModule.createDocument(app, swaggerOptions)
    // 项目依赖当前文档功能，最好不要改变当前地址
    // 生产环境使用 nginx 可以将当前文档地址 屏蔽外部访问
    SwaggerModule.setup(`${prefix}/docs`, app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'API Docs',
    })
  }

  // 全局验证
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    enableDebugMessages: true, // 开发环境
    disableErrorMessages: false,
  }),)
  // 日志
  // app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(logger)
  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor())
  // 所有异常
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalFilters(new HttpExceptionsFilter())
  //全局管道 清除不存在dto的字段
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

  // 获取配置端口
  const port = config.get<number>('app.port') || 8080
  await app.listen(port, '127.0.0.1')

  Logger.log(Chalk.green(`服务启动成功 `), `http://localhost:${port}${prefix}/`, '\n', Chalk.green('Api 文档地址 '), `http://localhost:${port}${prefix}/docs/`)
}
bootstrap();
