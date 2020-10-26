import { AbstractCheckSchema } from './checks/abstractCheckSchema';
import { Schema } from '../schema/schema';
import { ValidationResult } from './validationResult';
import { ErrorsMap } from '../errors/errorsMap';
export declare class Validator extends AbstractCheckSchema {
    private readonly listChecks;
    private checks;
    private errorsMap;
    protected errCode: string;
    constructor();
    validate(schema: Schema): ValidationResult;
    setErrorsMap(errorsMap: ErrorsMap): void;
    addChecker(check: AbstractCheckSchema): void;
    private prepareCheck;
    private createChecks;
    private createCheck;
    private prepareChecksUsingErrors;
}
