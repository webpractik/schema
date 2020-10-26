import { CriteriaDto } from './criteria.dto';
import { MetaDto } from './meta.dto';
import { SelectionDto } from './selection.dto';
export declare class SchemaDto {
    meta: MetaDto;
    text: string;
    selections: SelectionDto[];
    criteria?: CriteriaDto;
}
