import { AbstractCheckSchema } from "./abstractCheckSchema";
import { ErrorsMapUser } from "./mixins/errorsMapUser";
import { applyMixins } from "../../support/applyMixins";
import { ErrorsMap } from "../../errors/errorsMap";
import { ErrorDto } from "../../support/dto/errors/error.dto";

export class CheckSubTypes extends AbstractCheckSchema implements ErrorsMapUser {

    _errorsMap: ErrorsMap;
    protected errCode = 'bad-subtype';
    protected errDescription = 'Подтип ошибки не соответствует её типу';

    public setErrorsMap: () => void;
    public getSubjectErrorsMap: (subjectCode: string) => Map<string, ErrorDto>;

    public isValid(schema: string): boolean {
        const selectionsSubtypes = this.schema.selections.filter(selection => selection.subtype);
        for (const selection of selectionsSubtypes) {
            const error = this.getSubjectErrorsMap(this.schema.meta.subject).get(selection.type.toLowerCase());
            if (error) {
                const fragment = error.fragments.find(fragment => fragment.code === selection.subtype);
                if (fragment === undefined) {
                    this.errDescription = `Подтип ошибки ${selection.subtype} не соответствует её типу ${selection.type}`;
                    this.errors = [this.createError()];
                }
            }
        }
        return this.hasNoErrors();
    }
}

applyMixins(CheckSubTypes, [ErrorsMapUser]);
