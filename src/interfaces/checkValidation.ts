import { ErrorDto } from '../support/dto/validators/error.dto';

export interface CheckValidation {
  isValid(schema: string): boolean;

  getErrors(): ErrorDto[];
}
