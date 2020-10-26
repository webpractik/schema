import { AbstractCheckSchema } from './abstractCheckSchema';
import { ValidationResult } from '../validationResult';
import { Schema } from '../../schema/schema';
export declare class CheckErrorTypeCorrection extends AbstractCheckSchema {
    protected readonly errCode = "empty-correction";
    protected readonly errDescription = " \u0423 \u0444\u0440\u0430\u0433\u043C\u0435\u043D\u0442\u0430 \u0418\u0421\u041F \u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u043F\u043E\u043B\u0435 \u0438\u0441\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \"correction\"";
    validate(schema: Schema): ValidationResult;
}
