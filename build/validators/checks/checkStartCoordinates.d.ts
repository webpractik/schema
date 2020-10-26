import { AbstractCheckSchema } from './abstractCheckSchema';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
export declare class CheckStartCoordinates extends AbstractCheckSchema {
    protected readonly errCode = "start-coordinates";
    validate(schema: Schema): ValidationResult;
}
