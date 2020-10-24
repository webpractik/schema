import { CheckErrorTypes } from './checks/checkErrorTypes';
import { AbstractCheckSchema } from './checks/abstractCheckSchema';
import { isErrorsMapUser } from '../support/isErrorsMapUser';
import { CheckRangeMarkup } from './checks/checkRangeMarkup';
import { CheckSubTypes } from './checks/checkSubTypes';
import { CheckOriginalText } from './checks/checkOriginalText';
import { CheckEmptyFieldType } from './checks/checkEmptyFieldType';
import { CheckErrorTypeCorrection } from './checks/checkErrorTypeCorrection';
import { CheckStartCoordinates } from './checks/checkStartCoordinates';
import { CheckEqualityCoordinates } from './checks/checkEqualityCoordinates';
import { CheckUniqueTag } from './checks/checkUniqueTag';
import { CheckFullTextErrorsCoordinates } from './checks/checkFullTextErrorsCoordinates';
import { Schema } from '../schema/schema';
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

  public validate(schema: Schema): ValidationResult {
    let errors: ValidationErrorDto[] = [];
    for (const check of this.checks) {
      this.prepareCheck(check);
      try {
        const resultCheckValidate = check.validate(schema);
        if (!resultCheckValidate.status) {
          errors = errors.concat(resultCheckValidate.errors);
        }
      } catch (e) {
        errors.push(
          new ValidationErrorDto(
            this.errCode,
            `Запуск проверки завершился ошибкой ${e.message}`,
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
