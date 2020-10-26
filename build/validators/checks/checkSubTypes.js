"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckSubTypes = void 0;
const abstractCheckSchema_1 = require("./abstractCheckSchema");
const errorsMapUser_1 = require("./mixins/errorsMapUser");
const applyMixins_1 = require("../../support/applyMixins");
const validationError_dto_1 = require("../../support/dto/validators/validationError.dto");
class CheckSubTypes extends abstractCheckSchema_1.AbstractCheckSchema {
    constructor() {
        super(...arguments);
        this.errCode = 'bad-subtype';
    }
    validate(schema) {
        const errors = [];
        const selectionsSubtypes = schema.selections.filter((selection) => selection.subtype);
        for (const selection of selectionsSubtypes) {
            const error = this.getSubjectErrorsMap(schema.meta.subject).get(selection.type.toLowerCase());
            if (error) {
                const fragment = error.fragments.find((fragment) => fragment.code === selection.subtype);
                if (fragment === undefined) {
                    const errDescription = `Подтип ошибки ${selection.subtype} не соответствует её типу ${selection.type}`;
                    errors.push(new validationError_dto_1.ValidationErrorDto(this.errCode, errDescription));
                }
            }
        }
        return this.createNewValidationResult(errors);
    }
}
exports.CheckSubTypes = CheckSubTypes;
applyMixins_1.applyMixins(CheckSubTypes, [errorsMapUser_1.ErrorsMapUser]);
