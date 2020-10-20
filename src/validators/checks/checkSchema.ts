import { AbstractCheckSchema } from "./abstractCheckSchema";
import * as joi from "joi";
import { ObjectSchema } from "joi";

export class CheckSchema extends AbstractCheckSchema {

    protected errCode = 'err-schema-validate';

    isValid(schema: string): boolean {
        const joiSchema = this.getJoiSchema();
        const validateResult = joiSchema.validate(this.schema);
        if (validateResult.error) {
            this.errDescription = validateResult.error.message;
            this.errors.push(this.createError());
        }
        return this.hasNoErrors();
    }

    private getJoiSchema(): ObjectSchema {
        return joi.object({
            meta: joi.object().keys({
                id: joi.string().allow(""),
                uuid: joi.string().required(),
                theme: joi.string().required(),
                class: joi.number().allow(""),
                year: joi.number().required(),
                category: joi.string().allow(""),
                test: joi.string().required(),
                subject: joi.string().required(),
                taskText: joi.string().allow(""),
                expert: joi.string().allow(""),
                name: joi.string().allow("")
            }),
            text: joi.string()
                .required(),

            selections: joi.array().items(
                joi.object({
                    id: joi.number().required(),
                    startSelection: joi.number().required(),
                    endSelection: joi.number().required(),
                    type: joi.string().required(),
                    comment: joi.string().allow(""),
                    explanation: joi.string().allow(""),
                    correction: joi.string().allow(""),
                    tag: joi.string().allow(""),
                    group: joi.required(),
                    subtype: joi.string().allow(""),
                })
            ),
            criteria: joi.object(),
        });
    }


}
