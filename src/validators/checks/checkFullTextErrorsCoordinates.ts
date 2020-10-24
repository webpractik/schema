import { AbstractCheckSchema } from './abstractCheckSchema';
import { ErrorsMapUser } from './mixins/errorsMapUser';
import { ErrorsMap } from '../../errors/errorsMap';
import { applyMixins } from '../../support/applyMixins';
import { ErrorDto } from '../../support/dto/errors/error.dto';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
import { ValidationErrorDto } from '../../support/dto/validators/validationError.dto';

export class CheckFullTextErrorsCoordinates
  extends AbstractCheckSchema
  implements ErrorsMapUser {
  _errorsMap: ErrorsMap;
  protected readonly errCode = 'full-text-err-coordinates';
  protected readonly errDescription =
    'Общие ошибки имеют не нулевые "startSelection", "endSelection"';
  public setErrorsMap: () => void;
  public getSubjectErrorsMap: (subjectCode: string) => Map<string, ErrorDto>;

  public validate(schema: Schema): ValidationResult {
    const errors: ValidationErrorDto[] = [];
    for (const selection of schema.selections) {
      const error = this.getSubjectErrorsMap(schema.meta.subject).get(
        selection.type.toLowerCase(),
      );
      if (
        error &&
        (error.onFullText || error.disclosure) &&
        selection.startSelection != 0 &&
        selection.endSelection != 0
      ) {
        errors.push(new ValidationErrorDto(this.errCode, this.errDescription));
        break;
      }
    }
    return this.createNewValidationResult(errors);
  }
}

applyMixins(CheckFullTextErrorsCoordinates, [ErrorsMapUser]);
