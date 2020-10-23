import { ErrorsMap } from '../../../errors/errorsMap';
import { ErrorDto } from '../../../support/dto/errors/error.dto';

export class ErrorsMapUser {
  _errorsMap: ErrorsMap;

  public setErrorsMap(errorsMap: ErrorsMap) {
    this._errorsMap = errorsMap;
  }

  public getSubjectErrorsMap(subjectCode: string): Map<string, ErrorDto> {
    const subjectErrorsMap = this._errorsMap.errors.get(subjectCode);
    if (subjectErrorsMap) {
      return subjectErrorsMap;
    }
    throw new Error(`Неверный код предмета ${subjectCode}`);
  }
}
