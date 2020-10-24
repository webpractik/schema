import { CriteriaDto } from './criteria.dto';
import { MetaDto } from './meta.dto';
import { SelectionDto } from './selection.dto';

export class SchemaDto {
  private meta: MetaDto;
  private text: string;
  private selections: SelectionDto[];
  private criteria?: CriteriaDto;

  public toJson() {}

  /**
   * @throws ValidateException
   */
  public fromJson(jsonDoc: string): SchemaDto {
    return new SchemaDto();
  }
}
