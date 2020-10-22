import { AbstractCheckSchema } from "./abstractCheckSchema";

export class CheckRangeMarkup extends AbstractCheckSchema {

    protected errCode = 'bad-range';
    protected errDescription = 'Не попадение цифр диапазона разметок (начало и конец) в длину текста. ';

    public isValid(schema: string): boolean {
        const textLength = this.schema.text.length;
        const badRangeSelections = this.schema.selections.filter(selection =>
            (selection.startSelection > textLength || selection.endSelection > textLength));
        if (badRangeSelections.length > 0) {
            badRangeSelections.forEach((badRangeSelection) => {
                this.errDescription = `Не попадение цифр диапазона разметок в записи ${badRangeSelection.id} (начало ${badRangeSelection.startSelection} и конец ${badRangeSelection.endSelection}) в длину текста ${textLength}.`;
                this.errors.push(this.createError());
            })

        }
        return this.hasNoErrors();
    }

}
