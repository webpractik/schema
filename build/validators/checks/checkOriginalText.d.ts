import { AbstractCheckSchema } from './abstractCheckSchema';
import { ValidationResult } from '../validationResult';
import { Schema } from '../../schema/schema';
export declare class CheckOriginalText extends AbstractCheckSchema {
    private readonly _textCheckCallback;
    protected readonly errCode = "err-text-handler-callback";
    protected readonly errDescription = "\u041F\u0435\u0440\u0435\u0434\u0430\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043D\u0435\u0440\u0430\u0437\u043C\u0435\u0447\u0435\u043D\u043D\u043E\u043C\u0443 \u0442\u0435\u043A\u0441\u0442\u0443";
    constructor(callback: (publicId: string, text: string) => boolean);
    validate(schema: Schema): ValidationResult;
}
