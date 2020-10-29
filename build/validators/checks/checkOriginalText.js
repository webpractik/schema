"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckOriginalText = void 0;
const abstractCheckSchema_1 = require("./abstractCheckSchema");
const validationError_dto_1 = require("../../support/dto/validators/validationError.dto");
class CheckOriginalText extends abstractCheckSchema_1.AbstractCheckSchema {
    constructor(callback) {
        super();
        this.errCode = 'err-text-handler-callback';
        this.errDescription = 'Переданный текст не соответствует оригинальному тексту';
        this._textCheckCallback = callback;
    }
    validate(schema) {
        const errors = [];
        if (this._textCheckCallback !== undefined) {
            const resultCallback = this._textCheckCallback(schema.meta.id, schema.text);
            if (!resultCallback) {
                errors.push(new validationError_dto_1.ValidationErrorDto(this.errCode, this.errDescription));
            }
        }
        return this.createNewValidationResult(errors);
    }
    setErrMessage(description) {
        this.errDescription = description;
    }
}
exports.CheckOriginalText = CheckOriginalText;
