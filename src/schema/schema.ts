import { MetaDto } from '../support/dto/schema/meta.dto';
import { SelectionDto } from '../support/dto/schema/selection.dto';
import { CriteriaDto } from '../support/dto/schema/criteria.dto';
import { CheckSchema } from './checkSchema';

export class Schema {
  private _meta: MetaDto;
  private _text: string;
  private _selections: SelectionDto[] = [];
  private _criteria?: CriteriaDto;

  public toJson() {
    return JSON.stringify(this);
  }

  /**
   * @throws ValidateException
   */
  public static fromJson(jsonDoc: string): Schema {
    const schema: Schema = JSON.parse(jsonDoc);
    const validator = new CheckSchema();
    if (!schema.selections) {
      schema.selections = [];
    }
    const validationResult = validator.validate(schema);
    if (!validationResult.status) {
      throw new Error(validationResult.getValidateErrorsMessage());
    }
    return schema;
  }

  public addSelection(selection: SelectionDto): void {
    this._selections.push(selection);
  }

  get criteria(): CriteriaDto {
    return <CriteriaDto>this._criteria;
  }

  get meta(): MetaDto {
    return this._meta;
  }

  set meta(value: MetaDto) {
    this._meta = value;
  }

  get text(): string {
    return this._text;
  }

  get selections(): SelectionDto[] {
    return this._selections;
  }

  set criteria(value: CriteriaDto) {
    this._criteria = value;
  }

  set text(value: string) {
    this._text = value;
  }

  set selections(value: SelectionDto[]) {
    this._selections = value;
  }
}
