import { AbstractCheckSchema } from './abstractCheckSchema';
import { ErrorsMapUser } from './mixins/errorsMapUser';
import { ErrorsMap } from '../../errors/errorsMap';
import { applyMixins } from '../../support/applyMixins';
import { ErrorDto } from '../../support/dto/errors/error.dto';

export class CheckErrorTypes
  extends AbstractCheckSchema
  implements ErrorsMapUser {
  _errorsMap: ErrorsMap;
  protected errCode = 'bad-error-type';
  protected errDescription =
    'размеченные типы ошибок не соответствуют предмету размеченного файла';
  public getSubjectErrorsMap: (subjectCode: string) => Map<string, ErrorDto>;
  public setErrorsMap: () => void;

  public isValid(schema: string): boolean {
    const subjectErrorsMap = this.getSubjectErrorsMap(this.schema.meta.subject);
    const selectionTypes = this.schema.selections.map((selection) =>
      selection.type.toLowerCase(),
    );
    for (const type of selectionTypes) {
      const findErr = subjectErrorsMap.get(type);
      if (findErr === undefined) {
        this.errDescription = `Тип ошибки ${type} не соответствуют предмету размеченного файла ${this.schema.meta.subject}`;
        this.errors.push(this.createError());
      }
    }
    return this.hasNoErrors();
  }
}

applyMixins(CheckErrorTypes, [ErrorsMapUser]);
