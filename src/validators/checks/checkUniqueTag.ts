import { AbstractCheckSchema } from './abstractCheckSchema';

export class CheckUniqueTag extends AbstractCheckSchema {
  protected errCode = 'err-unique-tag';
  protected errDescription =
    'Присутствует уникальное значение поля "tag" в рамках одного файла';

  public isValid(schema: string): boolean {
    const selectionsWithTags = this.schema.selections.filter(
      (selection) => selection.tag,
    );
    const tags = selectionsWithTags.map((selection) => selection.tag);
    const uniqueElementCounts = this.getCountUniqueElements(tags);
    for (const tag in uniqueElementCounts) {
      if (uniqueElementCounts[tag] < 2) {
        this.errors = [this.createError()];
        break;
      }
    }
    return this.hasNoErrors();
  }

  private getCountUniqueElements(elements: string[]): any {
    let result: any = {};
    elements.forEach((element) => {
      result[element] = (result[element] || 0) + 1;
    });
    return result;
  }
}
