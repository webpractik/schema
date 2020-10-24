import { AbstractCheckSchema } from './abstractCheckSchema';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
import { ValidationErrorDto } from '../../support/dto/validators/validationError.dto';

export class CheckRangeMarkup extends AbstractCheckSchema {
  protected readonly errCode = 'bad-range';

  public validate(schema: Schema): ValidationResult {
    const errors: ValidationErrorDto[] = [];
    const textLength = schema.text.length;
    const badRangeSelections = schema.selections.filter(
      (selection) =>
        selection.startSelection > textLength ||
        selection.endSelection > textLength,
    );
    if (badRangeSelections.length > 0) {
      badRangeSelections.forEach((badRangeSelection) => {
        const errDescription = `Не попадение цифр диапазона разметок в записи ${badRangeSelection.id} (начало ${badRangeSelection.startSelection} и конец ${badRangeSelection.endSelection}) в длину текста ${textLength}.`;
        errors.push(new ValidationErrorDto(this.errCode, errDescription));
      });
    }
    return this.createNewValidationResult(errors);
  }
}
