import { AbstractCheckSchema } from './abstractCheckSchema';
import { Schema } from '../../schema/schema';
import { ValidationResult } from '../validationResult';
import { ValidationErrorDto } from '../../support/dto/validators/validationError.dto';

export class CheckUniqueTag extends AbstractCheckSchema {
  protected readonly errCode = 'err-unique-tag';
  protected readonly errDescription =
    'Присутствует уникальное значение поля "tag" в рамках одного файла';

  public validate(schema: Schema): ValidationResult {
    const errors: ValidationErrorDto[] = [];
    const selectionsWithTags = schema.selections.filter(
      (selection) => selection.tag,
    );
    const tags = selectionsWithTags.map((selection) => selection.tag);
    const uniqueElementCounts = this.getCountUniqueElements(tags);
    for (const tag in uniqueElementCounts) {
      if (uniqueElementCounts[tag] < 2) {
        errors.push(new ValidationErrorDto(this.errCode, this.errDescription));
        break;
      }
    }
    return this.createNewValidationResult(errors);
  }

  private getCountUniqueElements(elements: string[]): any {
    let result: any = {};
    elements.forEach((element) => {
      result[element] = (result[element] || 0) + 1;
    });
    return result;
  }
}
