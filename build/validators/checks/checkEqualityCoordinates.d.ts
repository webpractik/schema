import { AbstractCheckSchema } from './abstractCheckSchema';
import { ErrorsMapUser } from './mixins/errorsMapUser';
import { ErrorsMap } from '../../errors/errorsMap';
import { ValidationResult } from '../validationResult';
import { Schema } from '../../schema/schema';
import { ErrorDto } from '../../support/dto/errors/error.dto';
export declare class CheckEqualityCoordinates extends AbstractCheckSchema implements ErrorsMapUser {
    _errorsMap: ErrorsMap;
    protected errCode: string;
    protected errDescription: string;
    setErrorsMap: () => void;
    getSubjectErrorsMap: (subjectCode: string) => Map<string, ErrorDto>;
    validate(schema: Schema): ValidationResult;
}
