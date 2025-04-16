import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException, InternalServerErrorException } from '@nestjs/common'
import { AppHttpCode } from '../enums/code.enum'

@Catch()
export class DATASEARCHExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    HttpStatus.INTERNAL_SERVER_ERROR
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
      code: AppHttpCode.DATA_SEARCH_FAIL,
      msg: '数据查询失败！',
    })
  }
}
