"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const checkErrorTypes_1 = require("./checks/checkErrorTypes");
const abstractCheckSchema_1 = require("./checks/abstractCheckSchema");
const isErrorsMapUser_1 = require("../support/isErrorsMapUser");
const checkRangeMarkup_1 = require("./checks/checkRangeMarkup");
const checkSubTypes_1 = require("./checks/checkSubTypes");
const checkEmptyFieldType_1 = require("./checks/checkEmptyFieldType");
const checkErrorTypeCorrection_1 = require("./checks/checkErrorTypeCorrection");
const checkStartCoordinates_1 = require("./checks/checkStartCoordinates");
const checkEqualityCoordinates_1 = require("./checks/checkEqualityCoordinates");
const checkUniqueTag_1 = require("./checks/checkUniqueTag");
const checkFullTextErrorsCoordinates_1 = require("./checks/checkFullTextErrorsCoordinates");
const validationError_dto_1 = require("../support/dto/validators/validationError.dto");
class Validator extends abstractCheckSchema_1.AbstractCheckSchema {
    constructor() {
        super();
        this.listChecks = [
            checkEmptyFieldType_1.CheckEmptyFieldType,
            checkErrorTypeCorrection_1.CheckErrorTypeCorrection,
            checkRangeMarkup_1.CheckRangeMarkup,
            checkStartCoordinates_1.CheckStartCoordinates,
            checkErrorTypes_1.CheckErrorTypes,
            checkSubTypes_1.CheckSubTypes,
            checkFullTextErrorsCoordinates_1.CheckFullTextErrorsCoordinates,
            checkEqualityCoordinates_1.CheckEqualityCoordinates,
            checkUniqueTag_1.CheckUniqueTag,
        ];
        this.checks = [];
        this.errCode = 'fatal-check-error';
        this.createChecks();
    }
    validate(schema, debug = false) {
        let errors = [];
        for (const check of this.checks) {
            this.prepareCheck(check);
            try {
                const resultCheckValidate = check.validate(schema);
                if (!resultCheckValidate.status) {
                    errors = errors.concat(resultCheckValidate.errors);
                }
            }
            catch (e) {
                const debugTrace = debug ? e.trace : '';
                errors.push(new validationError_dto_1.ValidationErrorDto(this.errCode, `Запуск проверки завершился ошибкой ${e.message}`, debugTrace));
            }
        }
        return this.createNewValidationResult(errors);
    }
    setErrorsMap(errorsMap) {
        this.errorsMap = errorsMap;
    }
    addChecker(check) {
        this.checks.push(check);
    }
    prepareCheck(check) {
        this.prepareChecksUsingErrors(check);
    }
    createChecks() {
        this.checks = this.listChecks.map((checkClass) => this.createCheck(checkClass));
    }
    // noinspection JSMethodCanBeStatic
    createCheck(checkClass) {
        return new checkClass();
    }
    prepareChecksUsingErrors(check) {
        if (isErrorsMapUser_1.isErrorsMapUser(check)) {
            check.setErrorsMap(this.errorsMap);
        }
        return;
    }
}
exports.Validator = Validator;
