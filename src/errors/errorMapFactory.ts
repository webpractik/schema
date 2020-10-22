import axios from 'axios';
import { ErrorDto } from "../support/dto/errors/error.dto";
import { ErrorCategoryDto } from "../support/dto/errors/errorCategory.dto";
import { ErrorFragmentDto } from "../support/dto/errors/errorFragment.dto";
import { ErrorsMap } from "./errorsMap";

export class ErrorMapFactory {

    private readonly CATALOG_SERVICE_URL = 'https://catalog-errors.readable.upgreat.one/errors';
    private readonly SUBJECTS = ['rus', 'lit', 'social', 'hist', 'eng', 'rus-free', 'eng-free'];
    private readonly CACHING_TIME = 86400000;
    private map: ErrorsMap;


    private constructor() {

    }

    public static async createErrorMapFactory(): Promise<ErrorMapFactory> {
        const factory = new ErrorMapFactory();
        await factory.createErrorsMap();
        return factory;
    }

    public async refreshMap(): Promise<ErrorsMap> {
        return this.createErrorsMap()
    }

    public getMap(): ErrorsMap {
        return this.map;
    }

    private async createErrorsMap(): Promise<ErrorsMap> {
        this.map = await this.buildMap();
        setTimeout(this.createErrorsMap, this.CACHING_TIME);
        return this.map;
    }

    private async buildMap(): Promise<ErrorsMap> {
        const errorsMap = new ErrorsMap();
        errorsMap.errors = await this.fillMap();
        return errorsMap;
    }

    private async fillMap(): Promise<Map<string, Map<string, ErrorDto>>> {
        const map = new Map();
        for (const subject of this.SUBJECTS) {
            map.set(subject, new Map());
            const errorsSubjectsMap: Map<string, ErrorDto> = map.get(subject)
            const errors = await this.getErrorsBySubject(subject);
          /*  console.log('errrrrrrrrrrrorrs==================> ', subject, errors);*/
            errors.forEach((error) => errorsSubjectsMap.set(error.code.toLowerCase(), error));
        }
        return map;
    }

    getErrorsBySubject(subject: string): Promise<ErrorDto[]> {
        return axios.get(this.CATALOG_SERVICE_URL + `?subject=${subject}`).then((response) => {
            return this.buildErrors(response.data);
        });
    }

    private buildErrors(catalogErrors: any[]): ErrorDto[] {
        let result: ErrorDto[] = [];
        for (const category of catalogErrors) {
            result = result.concat(this.buildErrorFromCategory(category));
            if (category.sub_categories) {
                for (const subCategory of category.sub_categories) {
                    result = result.concat(this.buildErrorFromCategory(subCategory));
                }
            }
        }
        return result;
    }


    private buildErrorFromCategory(catalogError: any): ErrorDto[] {
        const category = this.buildCategory(catalogError);
        return catalogError.errors.map((error: any) => {
            const errorDto = new ErrorDto();
            errorDto.id = error.id;
            errorDto.code = error.code;
            errorDto.name = error.name;
            errorDto.description = error.description;
            errorDto.hasCorrection = error.has_correction;
            errorDto.onFullText = error.on_full_text;
            errorDto.hasRelationFragment = error.hasRelationFragment;
            errorDto.disclosure = error.disclosure;
            errorDto.category = category;
            errorDto.fragments = this.buildFragments(error.fragments);
            return errorDto;
        });
    }

    private buildCategory(catalogErrorCategory: any): ErrorCategoryDto {
        const category = new ErrorCategoryDto();
        category.id = catalogErrorCategory.id;
        category.active = catalogErrorCategory.active;
        category.color = catalogErrorCategory.color;
        category.subjectCode = catalogErrorCategory.subject_code;
        category.order = catalogErrorCategory.order;
        category.name = catalogErrorCategory.name;
        category.comment = catalogErrorCategory.comment;
        return category;
    }

    private buildFragments(catalogErrorFragments: any[]): ErrorFragmentDto[] {
        return catalogErrorFragments.map(fragment => this.buildErrorFragment(fragment));
    }

    private buildErrorFragment(catalogErrorFragment: any): ErrorFragmentDto {
        const fragment = new ErrorFragmentDto();
        fragment.code = catalogErrorFragment.code;
        fragment.description = catalogErrorFragment.description;
        return fragment;
    }

}
