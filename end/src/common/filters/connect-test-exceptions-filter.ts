import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common'
import { AppHttpCode } from '../enums/code.enum'

@Catch()
export class ConnectTestExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    // 特殊处理.因为这个异常捕获不到守卫里报的异常
    if (status != HttpStatus.INTERNAL_SERVER_ERROR) {
      const exceptionResponse = exception.getResponse()
      response.status(status).json({
        code: status,
        msg: exceptionResponse.message,
      })
      return
    }

    response.status(HttpStatus.OK).json({
      code: AppHttpCode.CONNECT_TEST_FAIL,
      msg: '测试连接失败，请检查配置！',
    })
  }
}
