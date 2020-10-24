import { AbstractCheckSchema } from './abstractCheckSchema';
import { ErrorsMapUser } from './mixins/errorsMapUser';
import { applyMixins } from '../../support/applyMixins';
import { ErrorsMap } from '../../errors/errorsMap';
import { ErrorDto } from '../../support/dto/errors/error.dto';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
import { ValidationErrorDto } from '../../support/dto/validators/validationError.dto';

export class CheckSubTypes
  extends AbstractCheckSchema
  implements ErrorsMapUser {
  _errorsMap: ErrorsMap;
  protected readonly errCode = 'bad-subtype';

  public setErrorsMap: () => void;
  public getSubjectErrorsMap: (subjectCode: string) => Map<string, ErrorDto>;

  public validate(schema: Schema): ValidationResult {
    const errors: ValidationErrorDto[] = [];
    const selectionsSubtypes = schema.selections.filter(
      (selection) => selection.subtype,
    );
    for (const selection of selectionsSubtypes) {
      const error = this.getSubjectErrorsMap(schema.meta.subject).get(
        selection.type.toLowerCase(),
      );
      if (error) {
        const fragment = error.fragments.find(
          (fragment) => fragment.code === selection.subtype,
        );
        if (fragment === undefined) {
          const errDescription = `Подтип ошибки ${selection.subtype} не соответствует её типу ${selection.type}`;
          errors.push(new ValidationErrorDto(this.errCode, errDescription));
        }
      }
    }
    return this.createNewValidationResult(errors);
  }
}

applyMixins(CheckSubTypes, [ErrorsMapUser]);
