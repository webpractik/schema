import { AbstractCheckSchema } from './abstractCheckSchema';

export class CheckStartCoordinates extends AbstractCheckSchema {
  protected errCode = 'start-coordinates';
  protected errDescription = 'endSelection меньше чем startSelection';

  public isValid(schema: string): boolean {
    const badSelections = this.schema.selections.filter(
      (selection) => selection.endSelection < selection.startSelection,
    );
    if (badSelections.length > 0) {
      badSelections.forEach((badSelection) => {
        this.errDescription = `В selection ${badSelection.id} endSelection меньше чем startSelection`;
        this.errors.push(this.createError());
      });
    }
    return this.hasNoErrors();
  }
}
