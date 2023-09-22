import { IsInt, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

class EnvironmentVariables {

    @IsString({ message: 'Invalid MONGODB_URI' })
    MONGODB_URI: string;

    @IsString({ message: 'Invalid MONGODB_TEST_URI' })
    MONGODB_TEST_URI: string;

    @IsString({ message: 'Invalid ELASTICSEARCH_NODE' })
    ELASTICSEARCH_NODE: string;

    @IsString({ message: 'Invalid SECRET_KEY' })
    SECRET_KEY: string;

    @IsInt({ message: 'Invalid NODE_APP_PORT' })
    NODE_APP_PORT: number;
}

export const validate = (config: Record<string, unknown>) => {

    // `plainToClass` to converts plain object into Class
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });

    // `validateSync` method validate the class and returns errors
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
};