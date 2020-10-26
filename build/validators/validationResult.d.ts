import { ValidationErrorDto } from '../support/dto/validators/validationError.dto';
export declare class ValidationResult {
    private readonly _status;
    private _errors;
    constructor(status: boolean, errors?: ValidationErrorDto[]);
    getValidateErrorsMessage(): string;
    get status(): boolean;
    get errors(): ValidationErrorDto[];
    set errors(value: ValidationErrorDto[]);
}
