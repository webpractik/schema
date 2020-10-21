import { CheckEmptyFieldType } from "./checks/CheckEmptyFieldType";
import { CheckEqualityCoordinates } from "./checks/CheckEqualityCoordinates";
import { CheckErrorTypeCorrection } from "./checks/CheckErrorTypeCorrection";
import { CheckErrorTypes } from "./checks/checkErrorTypes";
import { AbstractCheckSchema } from "./checks/abstractCheckSchema";
import { ErrorMapFactory } from "../errors/errorMapFactory";
import { isErrorsMapUser } from "../support/isErrorsMapUser";
import { CheckRangeMarkup } from "./checks/checkRangeMarkup";
import { CheckStartCoordinates } from "./checks/CheckStartCoordinates";
import { CheckSubTypes } from "./checks/checkSubTypes";
import { CheckFullTextErrorsCoordinates } from "./checks/checkFullTextErrorsСoordinates";
import { CheckUniqueTag } from "./checks/CheckUniqueTag";
import { CheckOriginalText } from "./checks/checkOriginalText";
import { TextHandler } from "./checks/mixins/textHandler";
import { applyMixins } from "../support/applyMixins";
import { isTextHandler } from "../support/isTextHandler";
import { CheckSchema } from "./checks/checkSchema";

export class Validator extends AbstractCheckSchema implements TextHandler {

    private readonly EMPTY_CHECKS_ERROR = 'Проверки не были созданы. Перед запуском валидации запустите метод createChecks';
    private readonly listChecks = [
        CheckEmptyFieldType,
        CheckErrorTypeCorrection,
        CheckRangeMarkup,
        CheckStartCoordinates,
        CheckErrorTypes,
        CheckSubTypes,
        CheckFullTextErrorsCoordinates,
        CheckEqualityCoordinates,
        CheckUniqueTag,
        CheckOriginalText,
        CheckSchema,
    ];
    private checks: AbstractCheckSchema[] = [];
    private errorsMapFactory: ErrorMapFactory;
    protected errCode = 'fatal-check-error';
    _textCheckCallback: (publicId: string, text: string) => boolean;
    public setValidatesCallback: (callback: (publicId: string, text: string) => boolean) => void;

    public isValid(schema: string): boolean {
        if (this.checks.length < 1) throw new Error(this.EMPTY_CHECKS_ERROR);
        for (const check of this.checks) {
            this.prepareCheck(check);
            check.setSchema(this.decodeSchema(schema));
            try {
                if (!check.isValid(schema)) {
                    this.errors = this.errors.concat(check.getErrors());
                }
            } catch (e) {
                this.handleCheckError(e);
            }
        }
        return this.hasNoErrors();
    }

    public createChecks(): void {
        this.checks = this.listChecks.map(checkClass => this.createCheck(checkClass));
    }

    public setErrorsMapFactory(errorsMapFactory: ErrorMapFactory): void {
        this.errorsMapFactory = errorsMapFactory;
    }

    public refresh() {
        super.refresh();
        for (const check of this.checks) {
            check.refresh();
        }
    }

    private prepareCheck(check: AbstractCheckSchema) {
        this.prepareChecksUsingErrors(check);
        if (isTextHandler(check) && this._textCheckCallback) {
            check.setValidatesCallback(this._textCheckCallback);
        }
    }

    private createCheck(checkClass: new () => AbstractCheckSchema): AbstractCheckSchema {
        return new checkClass();
    }

    private prepareChecksUsingErrors(check: AbstractCheckSchema): void {
        if (isErrorsMapUser(check)) {
            const errorsMap = this.errorsMapFactory.getMap();
            check.setErrorsMap(errorsMap);
        }
        return;
    }

    private handlePrepareError() {

    }

    private handleCheckError(error: Error) {
        this.errDescription = `Запуск проверки завершился ошибкой ${error.message}`
        this.errors.push(this.createError());
    }

}

applyMixins(Validator, [TextHandler]);

