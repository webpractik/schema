import { AbstractCheckSchema } from './abstractCheckSchema';
import { ErrorsMapUser } from './mixins/errorsMapUser';
import { ErrorsMap } from '../../errors/errorsMap';
import { ErrorDto } from '../../support/dto/errors/error.dto';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
export declare class CheckFullTextErrorsCoordinates extends AbstractCheckSchema implements ErrorsMapUser {
    _errorsMap: ErrorsMap;
    protected readonly errCode = "full-text-err-coordinates";
    protected readonly errDescription = "\u041E\u0431\u0449\u0438\u0435 \u043E\u0448\u0438\u0431\u043A\u0438 \u0438\u043C\u0435\u044E\u0442 \u043D\u0435 \u043D\u0443\u043B\u0435\u0432\u044B\u0435 \"startSelection\", \"endSelection\"";
    setErrorsMap: () => void;
    getSubjectErrorsMap: (subjectCode: string) => Map<string, ErrorDto>;
    validate(schema: Schema): ValidationResult;
}
