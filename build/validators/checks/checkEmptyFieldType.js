"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckEmptyFieldType = void 0;
const abstractCheckSchema_1 = require("./abstractCheckSchema");
const validationError_dto_1 = require("../../support/dto/validators/validationError.dto");
class CheckEmptyFieldType extends abstractCheckSchema_1.AbstractCheckSchema {
    constructor() {
        super(...arguments);
        this.errCode = 'empty-type';
        this.errDescription = 'Присутствуют фрагменты с пустыми типами ошибок "type"';
    }
    validate(schema) {
        let errors = [];
        const emptyTypeSelection = schema.selections.find((element) => element.type === '');
        if (emptyTypeSelection) {
            errors.push(new validationError_dto_1.ValidationErrorDto(this.errCode, this.errDescription));
        }
        return this.createNewValidationResult(errors);
    }
}
exports.CheckEmptyFieldType = CheckEmptyFieldType;
