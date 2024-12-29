import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // 处理 HTTP 异常
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const errorResponse = {
        code: status,
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message || exception.message,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest().url,
      };

      return response.status(status).json(errorResponse);
    }

    // 处理其他类型的异常（如数据库错误等）
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = {
      code: status,
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    };

    // 在开发环境下可以返回详细错误信息
    if (process.env.NODE_ENV === 'development') {
      errorResponse['error'] = exception.message;
      errorResponse['stack'] = exception.stack;
    }

    return response.status(status).json(errorResponse);
  }
}
