import { AbstractCheckSchema } from './abstractCheckSchema';
import { ErrorsMapUser } from './mixins/errorsMapUser';
import { ErrorsMap } from '../../errors/errorsMap';
import { applyMixins } from '../../support/applyMixins';
import { ValidationResult } from '../validationResult';
import { Schema } from '../../schema/schema';
import { ErrorDto } from '../../support/dto/errors/error.dto';
import { ValidationErrorDto } from '../../support/dto/validators/validationError.dto';

export class CheckEqualityCoordinates
  extends AbstractCheckSchema
  implements ErrorsMapUser {
  _errorsMap: ErrorsMap;
  protected errCode = 'err-equality-coordinates';
  protected errDescription = 'startSelection и endSelection равны';
  public setErrorsMap: () => void;
  public getSubjectErrorsMap: (subjectCode: string) => Map<string, ErrorDto>;

  public validate(schema: Schema): ValidationResult {
    const errors: ValidationErrorDto[] = [];
    for (const selection of schema.selections) {
      if (selection.startSelection === selection.endSelection) {
        const error = this.getSubjectErrorsMap(schema.meta.subject).get(
          selection.type.toLowerCase(),
        );
        if (error && (!error.onFullText || !error.disclosure)) {
          errors.push(
            new ValidationErrorDto(this.errCode, this.errDescription),
          );
          break;
        }
      }
    }
    return this.createNewValidationResult(errors);
  }
}

applyMixins(CheckEqualityCoordinates, [ErrorsMapUser]);
