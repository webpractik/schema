"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckErrorTypes = void 0;
const abstractCheckSchema_1 = require("./abstractCheckSchema");
const errorsMapUser_1 = require("./mixins/errorsMapUser");
const applyMixins_1 = require("../../support/applyMixins");
const validationError_dto_1 = require("../../support/dto/validators/validationError.dto");
class CheckErrorTypes extends abstractCheckSchema_1.AbstractCheckSchema {
    constructor() {
        super(...arguments);
        this.errCode = 'bad-error-type';
        this.errDescription = 'размеченные типы ошибок не соответствуют предмету размеченного файла';
    }
    validate(schema) {
        const errors = [];
        const subjectErrorsMap = this.getSubjectErrorsMap(schema.meta.subject);
        const selectionTypes = schema.selections.map((selection) => selection.type.toLowerCase());
        for (const type of selectionTypes) {
            const findErr = subjectErrorsMap.get(type);
            if (findErr === undefined) {
                const errDescription = `Тип ошибки ${type} не соответствуют предмету размеченного файла ${schema.meta.subject}`;
                errors.push(new validationError_dto_1.ValidationErrorDto(this.errCode, errDescription));
            }
        }
        return this.createNewValidationResult(errors);
    }
}
exports.CheckErrorTypes = CheckErrorTypes;
applyMixins_1.applyMixins(CheckErrorTypes, [errorsMapUser_1.ErrorsMapUser]);
