import { AbstractCheckSchema } from './abstractCheckSchema';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
import { ValidationErrorDto } from '../../support/dto/validators/validationError.dto';

export class CheckStartCoordinates extends AbstractCheckSchema {
  protected readonly errCode = 'start-coordinates';

  public validate(schema: Schema): ValidationResult {
    const errors: ValidationErrorDto[] = [];
    const badSelections = schema.selections.filter(
      (selection) => selection.endSelection < selection.startSelection,
    );
    if (badSelections.length > 0) {
      badSelections.forEach((badSelection) => {
        const errDescription = `В selection ${badSelection.id} endSelection меньше чем startSelection`;
        errors.push(new ValidationErrorDto(this.errCode, errDescription));
      });
    }
    return this.createNewValidationResult(errors);
  }
}
