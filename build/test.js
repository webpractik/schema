"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMapFactory_1 = require("./errors/errorMapFactory");
const validator_1 = require("./validators/validator");
const schema_1 = require("./schema/schema");
const checkOriginalText_1 = require("./validators/checks/checkOriginalText");
const jsonDoc = `{
    "text": "фрагменты\\nфрагменты фрагменты\\nфрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты\\nфрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты фрагменты",
    "meta": {
        "uuid": "1a665c81-b548-47d7-b1f5-ce08c7f90b01",
        "id": "0000017",
        "name": "0000017__ru_lit_expert_markup_1_noexp.txt",
        "subject": "lit",
        "test": "егэ тренировка",
        "category": "",
        "year": 2017,
        "class": "11",
        "theme": "Текст с тремя разметками",
        "taskText": "Исходный текст по которому писалось сочинение"
    },
    "selections": [
        {
            "id": 0,
            "tag": "",
            "type": "С.одностор",
            "group": "error",
            "comment": "",
            "subtype": "",
            "correction": "",
            "explanation": "",
            "endSelection": 9,
            "startSelection": 0
        },
        {
            "id": 23,
            "tag": "",
            "type": "С.понятие",
            "group": "error",
            "comment": "",
            "subtype": "",
            "correction": "",
            "explanation": "",
            "endSelection": 29,
            "startSelection": 10
        },
        {
            "id": 83,
            "tag": "",
            "type": "С.пересказ",
            "group": "error",
            "comment": "",
            "subtype": "",
            "correction": "",
            "explanation": "",
            "endSelection": 99,
            "startSelection": 60
        }
    ]
}`;
async function example() {
    const schema = schema_1.Schema.fromJson(jsonDoc);
    const errMap = await errorMapFactory_1.ErrorMapFactory.createErrorMap();
    const validator = new validator_1.Validator();
    validator.setErrorsMap(errMap);
    const textCheck = new checkOriginalText_1.CheckOriginalText((publicId, text) => {
        return true;
    });
    textCheck.setErrMessage('new error message');
    validator.addChecker(textCheck);
    const resultValidation = validator.validate(schema);
    console.log('resultValidation', resultValidation.status, resultValidation.errors);
}
example();
