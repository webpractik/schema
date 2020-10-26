import { CheckValidation } from '../../interfaces/checkValidation';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
import { ValidationErrorDto } from '../../support/dto/validators/validationError.dto';
export declare abstract class AbstractCheckSchema implements CheckValidation {
    protected errCode: string;
    protected errDescription: string;
    abstract validate(schema: Schema): ValidationResult;
    protected createNewValidationResult(errors?: ValidationErrorDto[]): ValidationResult;
}
