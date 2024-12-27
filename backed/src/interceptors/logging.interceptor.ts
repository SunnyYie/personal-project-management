import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Request, Response } from 'express';

  import { PrismaService } from '../prisma/prisma.service';

  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import * as UAParser from 'ua-parser-js';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    constructor(private prisma: PrismaService) {}
  
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const startTime = Date.now();
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();
  
      // 从 session 获取用户信息
      const sessionUser = request.session.user;
  
      // 解析 User-Agent
      const uaParser = new UAParser(request.headers['user-agent']);
      const userAgent = uaParser.getResult();
  
      return next.handle().pipe(
        tap(async (responseData) => {
          try {
            // 创建日志记录
            await this.prisma.operationLog.create({
              data: {
                userId: sessionUser?.id,
                email: sessionUser?.email,
                ip: this.getClientIp(request),
                method: request.method,
                path: request.path,
                params: {
                  query: request.query,
                  body: this.filterSensitiveData(request.body),
                  params: request.params,
                },
                userAgent: request.headers['user-agent'] || '',
                device: userAgent.device.type || userAgent.device.model || 'unknown',
                platform: `${userAgent.os.name} ${userAgent.os.version}`,
                status: response.statusCode,
                response: this.filterSensitiveData(responseData),
                duration: Date.now() - startTime,
              },
            });
          } catch (error) {
            console.error('Failed to create log:', error);
          }
        }),
      );
    }
  
    private getClientIp(request: Request): string {
      const forwardedFor = request.headers['x-forwarded-for'];
      if (forwardedFor) {
        return Array.isArray(forwardedFor)
          ? forwardedFor[0]
          : forwardedFor.split(',')[0];
      }
      return request.ip || request.socket.remoteAddress || 'unknown';
    }
  
    private filterSensitiveData(data: any): any {
      if (!data) return data;
      
      const sensitiveFields = ['password', 'token', 'refreshToken'];
      const filtered = { ...data };
      
      sensitiveFields.forEach(field => {
        if (field in filtered) {
          filtered[field] = '******';
        }
      });
      
      return filtered;
    }
  }