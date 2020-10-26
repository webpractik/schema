import { ErrorCategoryDto } from './errorCategory.dto';
import { ErrorFragmentDto } from './errorFragment.dto';
export declare class ErrorDto {
    id: number;
    name: string;
    code: string;
    hasCorrection: boolean;
    hasRelationFragment: boolean;
    onFullText: boolean;
    disclosure: boolean;
    description: string;
    category: ErrorCategoryDto;
    fragments: ErrorFragmentDto[];
}
