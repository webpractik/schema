import { AbstractCheckSchema } from '../validators/checks/abstractCheckSchema';
import { Schema } from './schema';
import { ValidationResult } from '../validators/validationResult';
export declare class CheckSchema extends AbstractCheckSchema {
    protected readonly errCode = "err-schema-validate";
    validate(schema: Schema): ValidationResult;
    private getJoiSchema;
}
