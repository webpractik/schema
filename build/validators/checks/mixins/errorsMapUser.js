"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsMapUser = void 0;
class ErrorsMapUser {
    setErrorsMap(errorsMap) {
        this._errorsMap = errorsMap;
    }
    getSubjectErrorsMap(subjectCode) {
        const subjectErrorsMap = this._errorsMap.errors.get(subjectCode);
        if (subjectErrorsMap) {
            return subjectErrorsMap;
        }
        throw new Error(`Неверный код предмета ${subjectCode}`);
    }
}
exports.ErrorsMapUser = ErrorsMapUser;
