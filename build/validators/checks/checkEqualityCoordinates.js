"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckEqualityCoordinates = void 0;
const abstractCheckSchema_1 = require("./abstractCheckSchema");
const errorsMapUser_1 = require("./mixins/errorsMapUser");
const applyMixins_1 = require("../../support/applyMixins");
const validationError_dto_1 = require("../../support/dto/validators/validationError.dto");
class CheckEqualityCoordinates extends abstractCheckSchema_1.AbstractCheckSchema {
    constructor() {
        super(...arguments);
        this.errCode = 'err-equality-coordinates';
        this.errDescription = 'startSelection и endSelection равны';
    }
    validate(schema) {
        const errors = [];
        for (const selection of schema.selections) {
            if (selection.startSelection === selection.endSelection) {
                const error = this.getSubjectErrorsMap(schema.meta.subject).get(selection.type.toLowerCase());
                if (error && (!error.onFullText || !error.disclosure)) {
                    errors.push(new validationError_dto_1.ValidationErrorDto(this.errCode, this.errDescription));
                    break;
                }
            }
        }
        return this.createNewValidationResult(errors);
    }
}
exports.CheckEqualityCoordinates = CheckEqualityCoordinates;
applyMixins_1.applyMixins(CheckEqualityCoordinates, [errorsMapUser_1.ErrorsMapUser]);
