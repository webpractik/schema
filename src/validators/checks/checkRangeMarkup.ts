import { AbstractCheckSchema } from "./abstractCheckSchema";

export class CheckRangeMarkup extends AbstractCheckSchema {

    errCode = 'bad-range';
    errDescription = 'Не попадение цифр диапазона разметок (начало и конец) в длину текста. ';

    isValid(schema: string): boolean {
        const textLength = this.schema.text.length;
        const badRangeSelections = this.schema.selections.filter(selection =>
            (selection.startSelection > textLength || selection.endSelection > textLength));
        if (badRangeSelections.length > 0) {
            this.errors.push(this.createError());
        }
        return this.hasNoErrors();
    }

}
