import { AbstractCheckSchema } from './abstractCheckSchema';
import { ErrorsMapUser } from './mixins/errorsMapUser';
import { ErrorsMap } from '../../errors/errorsMap';
import { ErrorDto } from '../../support/dto/errors/error.dto';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
export declare class CheckSubTypes extends AbstractCheckSchema implements ErrorsMapUser {
    _errorsMap: ErrorsMap;
    protected readonly errCode = "bad-subtype";
    setErrorsMap: () => void;
    getSubjectErrorsMap: (subjectCode: string) => Map<string, ErrorDto>;
    validate(schema: Schema): ValidationResult;
}
