import { AbstractCheckSchema } from "./abstractCheckSchema";
import { TextHandler } from "./mixins/textHandler";
import { applyMixins } from "../../support/applyMixins";

export class CheckOriginalText extends AbstractCheckSchema implements TextHandler {

    _textCheckCallback: (publicId: string, text: string) => boolean;
    protected errCode = 'err-text-handler-callback';
    protected errDescription = 'функция-замыкание вернула false';

    public setValidatesCallback: (callback: (publicId: string, text: string) => boolean) => void;

    public isValid(schema: string): boolean {
        if (this._textCheckCallback !== undefined) {
            const resultCallback = this._textCheckCallback(this.schema.meta.id, this.schema.text)
            if (!resultCallback) {
                this.errors.push(this.createError());
            }
        }
        return this.hasNoErrors();
    }
}

applyMixins(CheckOriginalText, [TextHandler]);
