import { AbstractCheckSchema } from "./abstractCheckSchema";

export class CheckErrorTypeCorrection extends AbstractCheckSchema {

    protected errCode = 'empty-correction';
    protected errDescription = ' У фрагмента ИСП не заполнено поле исправление "correction"'

    isValid(schema: string): boolean {
        const correctionFragments = this.schema.selections.filter(element => element.type.toUpperCase() === 'ИСП');
        if (correctionFragments.length > 0) {
            const emptyCorrectionElement = correctionFragments.find(element => (element.correction === ""));
            if (emptyCorrectionElement) {
                this.errors.push(this.createError());
            }
        }
        return this.hasNoErrors();
    }

}
