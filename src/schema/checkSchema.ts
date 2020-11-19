import * as joi from 'joi';
import { ObjectSchema } from 'joi';
import { AbstractCheckSchema } from '../validators/checks/abstractCheckSchema';
import { Schema } from './schema';
import { ValidationResult } from '../validators/validationResult';
import { ValidationErrorDto } from '../support/dto/validators/validationError.dto';

export class CheckSchema extends AbstractCheckSchema {
  protected readonly errCode = 'err-schema-validate';

  public validate(schema: Schema): ValidationResult {
    const joiSchema = this.getJoiSchema();
    const errors: ValidationErrorDto[] = [];
    const validateResult = joiSchema.validate(schema);
    if (validateResult.error) {
      const errDescription = validateResult.error.message;
      errors.push(new ValidationErrorDto(this.errCode, errDescription));
    }
    return this.createNewValidationResult(errors);
  }

  private getJoiSchema(): ObjectSchema {
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

      selections: joi.array().items(
        joi
          .object({
            id: joi.number().required().required(),
            startSelection: joi.number().required(),
            endSelection: joi.number().required(),
            type: joi.string().required(),
            comment: joi.string().allow(''),
            explanation: joi.string().allow(''),
            correction: joi.string().allow(''),
            tag: joi.string().allow(''),
            group: joi.required(),
            subtype: joi.string().allow(''),
          })
          .required(),
      ),
      criteria: joi.object(),
    });
  }
}
