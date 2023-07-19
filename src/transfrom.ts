import { Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationError, Validator, ValidatorOptions } from 'class-validator';

export async function validateDTO<T extends object>(
    object: Type<T>,
    value: object,
    validatorOptions?: ValidatorOptions
): Promise<{ instance: T; errors: ValidationError[] }> {
    const instance = plainToClass(object, value);
    return {
        instance,
        errors: await new Validator().validate(instance, { whitelist: true, ...validatorOptions }),
    };
}

export function stringified(errors: ValidationError[]): string {
    return JSON.stringify(errors)
  }