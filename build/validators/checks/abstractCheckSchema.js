"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCheckSchema = void 0;
const validationResult_1 = require("../validationResult");
class AbstractCheckSchema {
    createNewValidationResult(errors) {
        let status = true;
        if (errors && errors.length > 0) {
            status = false;
        }
        return new validationResult_1.ValidationResult(status, errors);
    }
}
exports.AbstractCheckSchema = AbstractCheckSchema;
