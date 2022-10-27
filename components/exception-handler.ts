import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const message: string = (exception as TypeORMError).message;
    const code: string = (exception as any).code;
    let customResponse;
    switch (code) {
      case '23505':
        customResponse = {
          status: 403,
          message: 'duplicate key',
          type: 'Not Acceptable',
          errors: [{ code: code, message: message }],
          errorCode: 300,
          timestamp: new Date().toISOString(),
        };
        break;
      default:
        customResponse = {
          status: 500,
          message: 'Something Went Wrong',
          type: 'Internal Server Error',
          errors: [{ code: code, message: message }],
          errorCode: 300,
          timestamp: new Date().toISOString(),
        };
    }

    response.status(customResponse.status).json(customResponse);
  }
}
