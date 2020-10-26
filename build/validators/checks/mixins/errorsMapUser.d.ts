import { ErrorsMap } from '../../../errors/errorsMap';
import { ErrorDto } from '../../../support/dto/errors/error.dto';
export declare class ErrorsMapUser {
    _errorsMap: ErrorsMap;
    setErrorsMap(errorsMap: ErrorsMap): void;
    getSubjectErrorsMap(subjectCode: string): Map<string, ErrorDto>;
}
