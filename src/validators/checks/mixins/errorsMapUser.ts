import { ErrorsMap } from "../../../errors/errorsMap";

export class ErrorsMapUser {

    _errorsMap: ErrorsMap;

    public setErrorsMap(errorsMap: ErrorsMap) {
        this._errorsMap = errorsMap;
    }
}
