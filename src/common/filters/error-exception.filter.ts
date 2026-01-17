import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const statusCode = exception.getStatus ? exception.getStatus() : 400;

    const exceptionResponse = exception.getResponse
      ? exception.getResponse()
      : { message: 'Error registrado no ErrorExceptionFilter.', statusCode };

    response.status(statusCode).json({
      ...exceptionResponse,
      data: new Date().toISOString(),
      path: request.url,
    });
  }
}
