import { AbstractCheckSchema } from './abstractCheckSchema';

export class CheckEmptyFieldType extends AbstractCheckSchema {
  protected errCode = 'empty-type';
  protected errDescription =
    'Присутствуют фрагменты с пустыми типами ошибок "type"';

  public isValid(schema: string): boolean {
    const emptyTypeSelection = this.schema.selections.find(
      (element) => element.type === '',
    );
    if (emptyTypeSelection) {
      this.errors.push(this.createError());
    }
    return this.hasNoErrors();
  }
}
