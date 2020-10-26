"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckSchema = void 0;
const joi = __importStar(require("joi"));
const abstractCheckSchema_1 = require("../validators/checks/abstractCheckSchema");
const validationError_dto_1 = require("../support/dto/validators/validationError.dto");
class CheckSchema extends abstractCheckSchema_1.AbstractCheckSchema {
    constructor() {
        super(...arguments);
        this.errCode = 'err-schema-validate';
    }
    validate(schema) {
        const joiSchema = this.getJoiSchema();
        const errors = [];
        const validateResult = joiSchema.validate(schema);
        if (validateResult.error) {
            const errDescription = validateResult.error.message;
            errors.push(new validationError_dto_1.ValidationErrorDto(this.errCode, errDescription));
        }
        return this.createNewValidationResult(errors);
    }
    getJoiSchema() {
        return joi.object({
            meta: joi.object().keys({
                id: joi.string().allow(''),
                uuid: joi.string().required(),
                theme: joi.string().required(),
                class: joi.string().allow(''),
                year: joi.number().required(),
                category: joi.string().allow('', null),
                test: joi.string().required(),
                subject: joi.string().required(),
                taskText: joi.string().allow(''),
                expert: joi.string().allow(''),
                name: joi.string().allow(''),
            }),
            text: joi.string().required(),
            selections: joi.array().items(joi.object({
                id: joi.number().required(),
                startSelection: joi.number().required(),
                endSelection: joi.number().required(),
                type: joi.string().required(),
                comment: joi.string().allow(''),
                explanation: joi.string().allow(''),
                correction: joi.string().allow(''),
                tag: joi.string().allow(''),
                group: joi.required(),
                subtype: joi.string().allow(''),
            })),
            criteria: joi.object(),
        });
    }
}
exports.CheckSchema = CheckSchema;
