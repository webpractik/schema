import { CheckErrorTypes } from './checks/checkErrorTypes';
import { AbstractCheckSchema } from './checks/abstractCheckSchema';
import { isErrorsMapUser } from '../support/isErrorsMapUser';
import { CheckRangeMarkup } from './checks/checkRangeMarkup';
import { CheckSubTypes } from './checks/checkSubTypes';
import { CheckEmptyFieldType } from './checks/checkEmptyFieldType';
import { CheckErrorTypeCorrection } from './checks/checkErrorTypeCorrection';
import { CheckStartCoordinates } from './checks/checkStartCoordinates';
import { CheckEqualityCoordinates } from './checks/checkEqualityCoordinates';
import { CheckUniqueTag } from './checks/checkUniqueTag';
import { CheckFullTextErrorsCoordinates } from './checks/checkFullTextErrorsCoordinates';
import { Schema } from '..';
import { ValidationResult } from './validationResult';
import { ValidationErrorDto } from '../support/dto/validators/validationError.dto';
import { ErrorsMap } from '../errors/errorsMap';

export class Validator extends AbstractCheckSchema {
  private readonly listChecks = [
    CheckEmptyFieldType,
    CheckErrorTypeCorrection,
    CheckRangeMarkup,
    CheckStartCoordinates,
    CheckErrorTypes,
    CheckSubTypes,
    CheckFullTextErrorsCoordinates,
    CheckEqualityCoordinates,
    CheckUniqueTag,
  ];
  private checks: AbstractCheckSchema[] = [];
  private errorsMap: ErrorsMap;
  protected errCode = 'fatal-check-error';

  constructor() {
    super();
    this.createChecks();
  }

  public validate(schema: Schema, debug: boolean = false): ValidationResult {
    let errors: ValidationErrorDto[] = [];
    for (const check of this.checks) {
      this.prepareCheck(check);
      try {
        const resultCheckValidate = check.validate(schema);
        if (!resultCheckValidate.status) {
          errors = errors.concat(resultCheckValidate.errors);
        }
      } catch (e) {
        const debugTrace = debug ? e.trace : '';
        errors.push(
          new ValidationErrorDto(
            this.errCode,
            `Запуск проверки завершился ошибкой ${e.message}`,
            debugTrace,
          ),
        );
      }
    }
    return this.createNewValidationResult(errors);
  }

  public setErrorsMap(errorsMap: ErrorsMap): void {
    this.errorsMap = errorsMap;
  }

  public addChecker(check: AbstractCheckSchema): void {
    this.checks.push(check);
  }

  private prepareCheck(check: AbstractCheckSchema) {
    this.prepareChecksUsingErrors(check);
  }

  private createChecks(): void {
    this.checks = this.listChecks.map((checkClass) =>
      this.createCheck(checkClass),
    );
  }

  // noinspection JSMethodCanBeStatic
  private createCheck(
    checkClass: new () => AbstractCheckSchema,
  ): AbstractCheckSchema {
    return new checkClass();
  }

  private prepareChecksUsingErrors(check: AbstractCheckSchema): void {
    if (isErrorsMapUser(check)) {
      check.setErrorsMap(this.errorsMap);
    }
    return;
  }
}
