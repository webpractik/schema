import { AbstractCheckSchema } from "./abstractCheckSchema";
import { ErrorsMapUser } from "./mixins/errorsMapUser";
import { applyMixins } from "../../support/applyMixins";
import { ErrorsMap } from "../../errors/errorsMap";

export class CheckSubTypes extends AbstractCheckSchema implements ErrorsMapUser {

    _errorsMap: ErrorsMap;
    errCode = 'bad-subtype';
    errDescription = 'Подтип ошибки не соответствует её типу';

    public setErrorsMap: () => void;

    isValid(schema: string): boolean {
        const selectionsSubtypes = this.schema.selections.filter(selection => selection.subtype);
        for (const selection of selectionsSubtypes) {
            const error = this._errorsMap.errors.get(selection.type);
            if (error) {
                const fragment = error.fragments.find(fragment => fragment.code === selection.subtype);
                if (fragment === undefined) {
                    this.errors = [this.createError()];
                    break;
                }
            }
        }
        return this.hasNoErrors();
    }
}

applyMixins(CheckSubTypes, [ErrorsMapUser]);
