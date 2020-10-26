"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckRangeMarkup = void 0;
const abstractCheckSchema_1 = require("./abstractCheckSchema");
const validationError_dto_1 = require("../../support/dto/validators/validationError.dto");
class CheckRangeMarkup extends abstractCheckSchema_1.AbstractCheckSchema {
    constructor() {
        super(...arguments);
        this.errCode = 'bad-range';
    }
    validate(schema) {
        const errors = [];
        const textLength = schema.text.length;
        const badRangeSelections = schema.selections.filter((selection) => selection.startSelection > textLength ||
            selection.endSelection > textLength);
        if (badRangeSelections.length > 0) {
            badRangeSelections.forEach((badRangeSelection) => {
                const errDescription = `Не попадение цифр диапазона разметок в записи ${badRangeSelection.id} (начало ${badRangeSelection.startSelection} и конец ${badRangeSelection.endSelection}) в длину текста ${textLength}.`;
                errors.push(new validationError_dto_1.ValidationErrorDto(this.errCode, errDescription));
            });
        }
        return this.createNewValidationResult(errors);
    }
}
exports.CheckRangeMarkup = CheckRangeMarkup;
