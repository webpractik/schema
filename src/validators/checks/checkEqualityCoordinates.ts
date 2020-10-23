import { AbstractCheckSchema } from './abstractCheckSchema';
import { ErrorsMapUser } from './mixins/errorsMapUser';
import { ErrorsMap } from '../../errors/errorsMap';
import { applyMixins } from '../../support/applyMixins';
import { ErrorDto } from '../../support/dto/errors/error.dto';

export class CheckEqualityCoordinates
  extends AbstractCheckSchema
  implements ErrorsMapUser {
  _errorsMap: ErrorsMap;
  protected errCode = 'err-equality-coordinates';
  protected errDescription = 'startSelection и endSelection равны';
  public setErrorsMap: () => void;
  public getSubjectErrorsMap: (subjectCode: string) => Map<string, ErrorDto>;

  public isValid(schema: string): boolean {
    for (const selection of this.schema.selections) {
      if (selection.startSelection === selection.endSelection) {
        const error = this.getSubjectErrorsMap(this.schema.meta.subject).get(
          selection.type.toLowerCase(),
        );
        if (error && (!error.onFullText || !error.disclosure)) {
          this.errors = [this.createError()];
          break;
        }
      }
    }
    return this.hasNoErrors();
  }
}

applyMixins(CheckEqualityCoordinates, [ErrorsMapUser]);
