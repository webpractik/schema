import { AbstractCheckSchema } from './abstractCheckSchema';
import { ValidationResult } from '../validationResult';
import { Schema } from '../../schema/schema';
export declare class CheckOriginalText extends AbstractCheckSchema {
    private readonly _textCheckCallback;
    protected readonly errCode = "err-text-handler-callback";
    protected errDescription: string;
    constructor(callback: (publicId: string, text: string) => boolean);
    validate(schema: Schema): ValidationResult;
    setErrMessage(description: string): void;
}
