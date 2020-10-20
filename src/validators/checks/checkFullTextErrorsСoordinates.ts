import { AbstractCheckSchema } from "./abstractCheckSchema";
import { ErrorsMapUser } from "./mixins/errorsMapUser";
import { ErrorsMap } from "../../errors/errorsMap";
import { applyMixins } from "../../support/applyMixins";

export class CheckFullTextErrorsCoordinates extends AbstractCheckSchema implements ErrorsMapUser {

    protected errCode = 'full-text-err-coordinates';
    protected errDescription = 'Общие ошибки имеют не нулевые "startSelection", "endSelection"';
    public setErrorsMap: () => void;
    _errorsMap: ErrorsMap;
    public isValid(schema: string): boolean {
        for (const selection of this.schema.selections) {
            const error = this._errorsMap.errors.get(selection.type);
            if (error && (error.onFullText || error.disclosure)
                && (selection.startSelection != 0 && selection.endSelection != 0)) {
                this.errors = [this.createError()];
                break;
            }
        }
        return this.hasNoErrors();
    }
}
applyMixins(CheckFullTextErrorsCoordinates, [ErrorsMapUser]);
