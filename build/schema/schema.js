"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const checkSchema_1 = require("./checkSchema");
class Schema {
    constructor() {
        this._selections = [];
    }
    toJson() {
        return JSON.stringify(this);
    }
    /**
     * @throws ValidateException
     */
    static fromJson(jsonDoc) {
        const schema = JSON.parse(jsonDoc);
        const validator = new checkSchema_1.CheckSchema();
        if (!schema.selections) {
            schema.selections = [];
        }
        const validationResult = validator.validate(schema);
        if (!validationResult.status) {
            throw new Error(validationResult.getValidateErrorsMessage());
        }
        return schema;
    }
    addSelection(selection) {
        this._selections.push(selection);
    }
    get criteria() {
        return this._criteria;
    }
    get meta() {
        return this._meta;
    }
    set meta(value) {
        this._meta = value;
    }
    get text() {
        return this._text;
    }
    get selections() {
        return this._selections;
    }
    set criteria(value) {
        this._criteria = value;
    }
    set text(value) {
        this._text = value;
    }
    set selections(value) {
        this._selections = value;
    }
}
exports.Schema = Schema;
