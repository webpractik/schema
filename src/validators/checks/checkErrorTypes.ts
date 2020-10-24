import { AbstractCheckSchema } from './abstractCheckSchema';
import { ErrorsMapUser } from './mixins/errorsMapUser';
import { ErrorsMap } from '../../errors/errorsMap';
import { applyMixins } from '../../support/applyMixins';
import { ErrorDto } from '../../support/dto/errors/error.dto';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
import { ValidationErrorDto } from '../../support/dto/validators/validationError.dto';

export class CheckErrorTypes
  extends AbstractCheckSchema
  implements ErrorsMapUser {
  _errorsMap: ErrorsMap;
  protected errCode = 'bad-error-type';
  protected errDescription =
    'размеченные типы ошибок не соответствуют предмету размеченного файла';
  public getSubjectErrorsMap: (subjectCode: string) => Map<string, ErrorDto>;
  public setErrorsMap: () => void;

  public validate(schema: Schema): ValidationResult {
    const errors: ValidationErrorDto[] = [];
    const subjectErrorsMap = this.getSubjectErrorsMap(schema.meta.subject);
    const selectionTypes = schema.selections.map((selection) =>
      selection.type.toLowerCase(),
    );
    for (const type of selectionTypes) {
      const findErr = subjectErrorsMap.get(type);
      if (findErr === undefined) {
        const errDescription = `Тип ошибки ${type} не соответствуют предмету размеченного файла ${schema.meta.subject}`;
        errors.push(new ValidationErrorDto(this.errCode, errDescription));
      }
    }
    return this.createNewValidationResult(errors);
  }
}

applyMixins(CheckErrorTypes, [ErrorsMapUser]);
