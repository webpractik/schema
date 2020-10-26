import { AbstractCheckSchema } from './abstractCheckSchema';
import { ErrorsMapUser } from './mixins/errorsMapUser';
import { ErrorsMap } from '../../errors/errorsMap';
import { ErrorDto } from '../../support/dto/errors/error.dto';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
export declare class CheckErrorTypes extends AbstractCheckSchema implements ErrorsMapUser {
    _errorsMap: ErrorsMap;
    protected errCode: string;
    protected errDescription: string;
    getSubjectErrorsMap: (subjectCode: string) => Map<string, ErrorDto>;
    setErrorsMap: () => void;
    validate(schema: Schema): ValidationResult;
}
