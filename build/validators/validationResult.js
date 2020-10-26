"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationResult = void 0;
class ValidationResult {
    constructor(status, errors) {
        this._errors = [];
        this._status = status;
        if (errors) {
            this._errors = errors;
        }
    }
    getValidateErrorsMessage() {
        let errorMessage = '';
        this.errors.forEach((error) => {
            errorMessage = errorMessage + `${error.description} \n`;
        });
        return errorMessage;
    }
    get status() {
        return this._status;
    }
    get errors() {
        return this._errors;
    }
    set errors(value) {
        this._errors = value;
    }
}
exports.ValidationResult = ValidationResult;
