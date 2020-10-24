import { ErrorDto } from './error.dto';

export class ValidationResult {
  private _status: boolean;
  private _errors: ErrorDto[];

  get status(): boolean {
    return this._status;
  }

  get errors(): ErrorDto[] {
    return this._errors;
  }

  constructor(status: boolean, errors: ErrorDto[]) {
    this._status = status;
    this._errors = errors;
  }
}
