import { AbstractCheckSchema } from './abstractCheckSchema';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
export declare class CheckUniqueTag extends AbstractCheckSchema {
    protected readonly errCode = "err-unique-tag";
    protected readonly errDescription = "\u041F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \"tag\" \u0432 \u0440\u0430\u043C\u043A\u0430\u0445 \u043E\u0434\u043D\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0430";
    validate(schema: Schema): ValidationResult;
    private getCountUniqueElements;
}
