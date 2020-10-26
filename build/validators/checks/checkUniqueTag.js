"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckUniqueTag = void 0;
const abstractCheckSchema_1 = require("./abstractCheckSchema");
const validationError_dto_1 = require("../../support/dto/validators/validationError.dto");
class CheckUniqueTag extends abstractCheckSchema_1.AbstractCheckSchema {
    constructor() {
        super(...arguments);
        this.errCode = 'err-unique-tag';
        this.errDescription = 'Присутствует уникальное значение поля "tag" в рамках одного файла';
    }
    validate(schema) {
        const errors = [];
        const selectionsWithTags = schema.selections.filter((selection) => selection.tag);
        const tags = selectionsWithTags.map((selection) => selection.tag);
        const uniqueElementCounts = this.getCountUniqueElements(tags);
        for (const tag in uniqueElementCounts) {
            if (uniqueElementCounts[tag] < 2) {
                errors.push(new validationError_dto_1.ValidationErrorDto(this.errCode, this.errDescription));
                break;
            }
        }
        return this.createNewValidationResult(errors);
    }
    getCountUniqueElements(elements) {
        let result = {};
        elements.forEach((element) => {
            result[element] = (result[element] || 0) + 1;
        });
        return result;
    }
}
exports.CheckUniqueTag = CheckUniqueTag;
