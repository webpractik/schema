"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckStartCoordinates = void 0;
const abstractCheckSchema_1 = require("./abstractCheckSchema");
const validationError_dto_1 = require("../../support/dto/validators/validationError.dto");
class CheckStartCoordinates extends abstractCheckSchema_1.AbstractCheckSchema {
    constructor() {
        super(...arguments);
        this.errCode = 'start-coordinates';
    }
    validate(schema) {
        const errors = [];
        const badSelections = schema.selections.filter((selection) => selection.endSelection < selection.startSelection);
        if (badSelections.length > 0) {
            badSelections.forEach((badSelection) => {
                const errDescription = `В selection ${badSelection.id} endSelection меньше чем startSelection`;
                errors.push(new validationError_dto_1.ValidationErrorDto(this.errCode, errDescription));
            });
        }
        return this.createNewValidationResult(errors);
    }
}
exports.CheckStartCoordinates = CheckStartCoordinates;
