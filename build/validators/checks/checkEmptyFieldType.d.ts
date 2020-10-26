import { AbstractCheckSchema } from './abstractCheckSchema';
import { ValidationResult } from '../validationResult';
import { Schema } from '../../schema/schema';
export declare class CheckEmptyFieldType extends AbstractCheckSchema {
    protected readonly errCode = "empty-type";
    protected readonly errDescription = "\u041F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \u0444\u0440\u0430\u0433\u043C\u0435\u043D\u0442\u044B \u0441 \u043F\u0443\u0441\u0442\u044B\u043C\u0438 \u0442\u0438\u043F\u0430\u043C\u0438 \u043E\u0448\u0438\u0431\u043E\u043A \"type\"";
    validate(schema: Schema): ValidationResult;
}
