"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckErrorTypeCorrection = void 0;
const abstractCheckSchema_1 = require("./abstractCheckSchema");
const validationError_dto_1 = require("../../support/dto/validators/validationError.dto");
class CheckErrorTypeCorrection extends abstractCheckSchema_1.AbstractCheckSchema {
    constructor() {
        super(...arguments);
        this.errCode = 'empty-correction';
        this.errDescription = ' У фрагмента ИСП не заполнено поле исправление "correction"';
    }
    validate(schema) {
        const errors = [];
        const correctionFragments = schema.selections.filter((element) => element.type.toUpperCase() === 'ИСП');
        if (correctionFragments.length > 0) {
            const emptyCorrectionElement = correctionFragments.find((element) => element.correction === '');
            if (emptyCorrectionElement) {
                errors.push(new validationError_dto_1.ValidationErrorDto(this.errCode, this.errDescription));
            }
        }
        return this.createNewValidationResult(errors);
    }
}
exports.CheckErrorTypeCorrection = CheckErrorTypeCorrection;
