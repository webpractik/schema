import { MetaDto } from '../support/dto/schema/meta.dto';
import { SelectionDto } from '../support/dto/schema/selection.dto';
import { CriteriaDto } from '../support/dto/schema/criteria.dto';
export declare class Schema {
    private _meta;
    private _text;
    private _selections;
    private _criteria?;
    toJson(): string;
    /**
     * @throws ValidateException
     */
    static fromJson(jsonDoc: string): Schema;
    addSelection(selection: SelectionDto): void;
    get criteria(): CriteriaDto;
    get meta(): MetaDto;
    set meta(value: MetaDto);
    get text(): string;
    get selections(): SelectionDto[];
    set criteria(value: CriteriaDto);
    set text(value: string);
}
