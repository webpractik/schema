import { CheckValidation } from '../../interfaces/checkValidation';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
import { ValidationErrorDto } from '../../support/dto/validators/validationError.dto';

export abstract class AbstractCheckSchema implements CheckValidation {
  protected errCode: string;
  protected errDescription: string;

  public abstract validate(schema: Schema): ValidationResult;

  protected createNewValidationResult(
    errors?: ValidationErrorDto[],
  ): ValidationResult {
    let status = true;
    if (errors && errors.length > 0) {
      status = false;
    }
    return new ValidationResult(status, errors);
  }
}
