import { AbstractCheckSchema } from './abstractCheckSchema';
import { ValidationResult } from '../validationResult';
import { Schema } from '../../schema/schema';
export declare class CheckOriginalText extends AbstractCheckSchema {
    private readonly _textCheckCallback;
    protected readonly errCode = "err-text-handler-callback";
    protected readonly errDescription = "\u0444\u0443\u043D\u043A\u0446\u0438\u044F-\u0437\u0430\u043C\u044B\u043A\u0430\u043D\u0438\u0435 \u0432\u0435\u0440\u043D\u0443\u043B\u0430 false";
    constructor(callback: (publicId: string, text: string) => boolean);
    validate(schema: Schema): ValidationResult;
}
