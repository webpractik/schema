"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationResult = exports.CheckOriginalText = exports.Validator = exports.ErrorMapFactory = exports.Schema = void 0;
const validator_1 = require("./validators/validator");
Object.defineProperty(exports, "Validator", { enumerable: true, get: function () { return validator_1.Validator; } });
const schema_1 = require("./schema/schema");
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return schema_1.Schema; } });
const errorMapFactory_1 = require("./errors/errorMapFactory");
Object.defineProperty(exports, "ErrorMapFactory", { enumerable: true, get: function () { return errorMapFactory_1.ErrorMapFactory; } });
const checkOriginalText_1 = require("./validators/checks/checkOriginalText");
Object.defineProperty(exports, "CheckOriginalText", { enumerable: true, get: function () { return checkOriginalText_1.CheckOriginalText; } });
const validationResult_1 = require("./validators/validationResult");
Object.defineProperty(exports, "ValidationResult", { enumerable: true, get: function () { return validationResult_1.ValidationResult; } });
exports.default = validator_1.Validator;
