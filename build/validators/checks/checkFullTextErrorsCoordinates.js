"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckFullTextErrorsCoordinates = void 0;
const abstractCheckSchema_1 = require("./abstractCheckSchema");
const errorsMapUser_1 = require("./mixins/errorsMapUser");
const applyMixins_1 = require("../../support/applyMixins");
const validationError_dto_1 = require("../../support/dto/validators/validationError.dto");
class CheckFullTextErrorsCoordinates extends abstractCheckSchema_1.AbstractCheckSchema {
    constructor() {
        super(...arguments);
        this.errCode = 'full-text-err-coordinates';
        this.errDescription = 'Общие ошибки имеют не нулевые "startSelection", "endSelection"';
    }
    validate(schema) {
        const errors = [];
        for (const selection of schema.selections) {
            const error = this.getSubjectErrorsMap(schema.meta.subject).get(selection.type.toLowerCase());
            if (error &&
                (error.onFullText || error.disclosure) &&
                selection.startSelection != 0 &&
                selection.endSelection != 0) {
                errors.push(new validationError_dto_1.ValidationErrorDto(this.errCode, this.errDescription));
                break;
            }
        }
        return this.createNewValidationResult(errors);
    }
}
exports.CheckFullTextErrorsCoordinates = CheckFullTextErrorsCoordinates;
applyMixins_1.applyMixins(CheckFullTextErrorsCoordinates, [errorsMapUser_1.ErrorsMapUser]);
