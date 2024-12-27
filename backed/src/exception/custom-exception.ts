import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message, statusCode);
  }
}

export class ValidationException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedException extends CustomException {
  constructor(message: string = '未授权访问') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenException extends CustomException {
  constructor(message: string = '禁止访问') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends CustomException {
  constructor(message: string = '资源不存在') {
    super(message, HttpStatus.NOT_FOUND);
  }
}