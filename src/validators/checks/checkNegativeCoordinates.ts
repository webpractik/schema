import { AbstractCheckSchema } from './abstractCheckSchema';
import { Schema, ValidationResult } from '../../index';
import { ValidationErrorDto } from '../../support/dto/validators/validationError.dto';

export class CheckNegativeCoordinates extends AbstractCheckSchema {
  protected readonly errCode = 'negative-coordinates';

  validate(schema: Schema): ValidationResult {
    const errors: ValidationErrorDto[] = [];
    const badSelections = schema.selections.filter(
      (selection) => selection.startSelection < 0 || selection.endSelection < 0,
    );
    if (badSelections.length > 0) {
      badSelections.forEach((badSelection) => {
        const errDescription = `В selection ${badSelection.id} присутствуют отрицательные значения startSelection или endSelection`;
        errors.push(new ValidationErrorDto(this.errCode, errDescription));
      });
    }

    return this.createNewValidationResult(errors);
  }
}
