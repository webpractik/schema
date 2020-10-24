import { AbstractCheckSchema } from './abstractCheckSchema';
import { ValidationResult } from '../validationResult';
import { Schema } from '../../schema/schema';
import { ValidationErrorDto } from '../../support/dto/validators/validationError.dto';

export class CheckEmptyFieldType extends AbstractCheckSchema {
  protected readonly errCode = 'empty-type';
  protected readonly errDescription =
    'Присутствуют фрагменты с пустыми типами ошибок "type"';

  public validate(schema: Schema): ValidationResult {
    let errors = [];
    const emptyTypeSelection = schema.selections.find(
      (element) => element.type === '',
    );
    if (emptyTypeSelection) {
      errors.push(new ValidationErrorDto(this.errCode, this.errDescription));
    }
    return this.createNewValidationResult(errors);
  }
}
