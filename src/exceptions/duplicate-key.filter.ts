// src/exceptions/duplicate-key.filter.ts
import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class DuplicateKeyExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const statusCode = 400; // Bad Request
        const error = "Bad Request";
        if (exception.code === 11000) {
            // Duplicate key error (code 11000)
            response.status(statusCode).json({
                message: ['it is already taken'],
                // message: ['Duplicate key error. This value is already in use.'],
                error,
                statusCode
            });
        } else {
            // Other MongoDB errors
            response.status(statusCode).json({
                message: ['An error occurred.'],
                error,
                statusCode,
            });
        }
    }
}
