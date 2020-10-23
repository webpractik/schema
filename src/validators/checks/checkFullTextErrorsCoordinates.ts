import { AbstractCheckSchema } from './abstractCheckSchema';
import { ErrorsMapUser } from './mixins/errorsMapUser';
import { ErrorsMap } from '../../errors/errorsMap';
import { applyMixins } from '../../support/applyMixins';
import { ErrorDto } from '../../support/dto/errors/error.dto';

export class CheckFullTextErrorsCoordinates
  extends AbstractCheckSchema
  implements ErrorsMapUser {
  _errorsMap: ErrorsMap;
  protected errCode = 'full-text-err-coordinates';
  protected errDescription =
    'Общие ошибки имеют не нулевые "startSelection", "endSelection"';
  public setErrorsMap: () => void;
  public getSubjectErrorsMap: (subjectCode: string) => Map<string, ErrorDto>;

  public isValid(schema: string): boolean {
    for (const selection of this.schema.selections) {
      const error = this.getSubjectErrorsMap(this.schema.meta.subject).get(
        selection.type.toLowerCase(),
      );
      if (
        error &&
        (error.onFullText || error.disclosure) &&
        selection.startSelection != 0 &&
        selection.endSelection != 0
      ) {
        this.errors = [this.createError()];
        break;
      }
    }
    return this.hasNoErrors();
  }
}
applyMixins(CheckFullTextErrorsCoordinates, [ErrorsMapUser]);
