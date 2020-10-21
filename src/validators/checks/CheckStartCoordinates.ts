import { AbstractCheckSchema } from "./abstractCheckSchema";

export class CheckStartCoordinates extends AbstractCheckSchema {

    protected errCode = 'start-coordinates';
    protected errDescription = 'endSelection меньше чем startSelection';

    public isValid(schema: string): boolean {
        const badSelections = this.schema.selections.filter(selection => (selection.endSelection < selection.startSelection));
        if (badSelections.length > 0) {
            this.errors.push(this.createError());
        }
        return this.hasNoErrors();
    }

}
