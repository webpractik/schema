import { AbstractCheckSchema } from "./abstractCheckSchema";
import { ErrorsMapUser } from "./mixins/errorsMapUser";
import { ErrorsMap } from "../../errors/errorsMap";
import { applyMixins } from "../../support/applyMixins";
import { ErrorDto } from "../../support/dto/errors/error.dto";

export class CheckErrorTypes extends AbstractCheckSchema implements ErrorsMapUser {

    _errorsMap: ErrorsMap;
    protected errCode = 'bad-error-type';
    protected errDescription = 'размеченные типы ошибок не соответствуют предмету размеченного файла';

    public setErrorsMap: () => void;

    public isValid(schema: string): boolean {
        const subjectCode = this.schema.meta.subject;
        const subjectErrors = this.getSubjectErrors(subjectCode);
        const selectionTypes = this.schema.selections.map(selection => selection.type);
        for (const type of selectionTypes) {
            const findErr = subjectErrors.find(error => error.code === type);
            if (findErr === undefined) {
                this.errors = [this.createError()];
                break;
            }
        }
        return this.hasNoErrors();
    }

    private getSubjectErrors(subjectCode: string): ErrorDto[] {
        const errors = Array.from(this._errorsMap.errors.values());
        return errors.filter(error => error.category.subjectCode === subjectCode);
    }

}

applyMixins(CheckErrorTypes, [ErrorsMapUser]);
