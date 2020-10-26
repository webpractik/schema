import { AbstractCheckSchema } from './abstractCheckSchema';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
export declare class CheckRangeMarkup extends AbstractCheckSchema {
    protected readonly errCode = "bad-range";
    validate(schema: Schema): ValidationResult;
}
