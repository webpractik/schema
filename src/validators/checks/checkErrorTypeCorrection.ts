import { AbstractCheckSchema } from './abstractCheckSchema';
import { ValidationResult } from '../validationResult';
import { Schema } from '../../schema/schema';
import { ValidationErrorDto } from '../../support/dto/validators/validationError.dto';

export class CheckErrorTypeCorrection extends AbstractCheckSchema {
  protected readonly errCode = 'empty-correction';
  protected readonly errDescription =
    ' У фрагмента ИСП не заполнено поле исправление "correction"';

  public validate(schema: Schema): ValidationResult {
    const errors: ValidationErrorDto[] = [];
    const correctionFragments = schema.selections.filter(
      (element) => element.type.toUpperCase() === 'ИСП',
    );
    if (correctionFragments.length > 0) {
      const emptyCorrectionElement = correctionFragments.find(
        (element) => element.correction === '',
      );
      if (emptyCorrectionElement) {
        errors.push(new ValidationErrorDto(this.errCode, this.errDescription));
      }
    }
    return this.createNewValidationResult(errors);
  }
}
