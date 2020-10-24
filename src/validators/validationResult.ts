import { ValidationErrorDto } from '../support/dto/validators/validationError.dto';
import { ErrorDto } from '../support/dto/errors/error.dto';

export class ValidationResult {
  private readonly _status: boolean;
  private _errors: ValidationErrorDto[] = [];

  constructor(status: boolean, errors?: ValidationErrorDto[]) {
    this._status = status;
    if (errors) {
      this._errors = errors;
    }
  }

  public getValidateErrorsMessage(): string {
    let errorMessage = '';
    this.errors.forEach((error) => {
      errorMessage = errorMessage + `${error.description} \n`;
    });
    return errorMessage;
  }

  get status(): boolean {
    return this._status;
  }

  get errors(): ValidationErrorDto[] {
    return this._errors;
  }

  set errors(value: ValidationErrorDto[]) {
    this._errors = value;
  }
}
