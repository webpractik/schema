import axios from 'axios';
import { ErrorDto } from "../support/dto/errors/error.dto";
import { ErrorCategoryDto } from "../support/dto/errors/errorCategory.dto";
import { ErrorFragmentDto } from "../support/dto/errors/errorFragment.dto";
import { ErrorsMap } from "./errorsMap";

export class ErrorMapFactory {

    private readonly CATALOG_SERVICE_URL = 'https://rc.catalog-errors.readable.w6p.ru/errors/all';
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
        const catalogErrors = await this.getErrorsFromCatalogService();
        this.map = await this.buildMap(catalogErrors);
        setTimeout(this.createErrorsMap, this.CACHING_TIME);
        return this.map;
    }

    private buildMap(errors: ErrorDto[]): ErrorsMap {
        const errorsMap = new ErrorsMap();
        errorsMap.errors = this.fillMap(errors);
        return errorsMap;
    }

    private fillMap(errors: ErrorDto[]) {
        const map = new Map<string, ErrorDto>();
        for (const error of errors) {
            map.set(error.code, error);
        }
        return map;
    }

    private getErrorsFromCatalogService(): Promise<ErrorDto[]> {
        return axios.get(this.CATALOG_SERVICE_URL).then((response) => {
            return this.buildErrors(response.data);
        });
    }

    private async buildErrors(catalogErrors: any[]): Promise<ErrorDto[]> {
        return catalogErrors.map(error => this.buildError(error));
    }

    private buildError(catalogError: any): ErrorDto {
        const error = new ErrorDto();
        error.id = catalogError.id;
        error.code = catalogError.code;
        error.name = catalogError.name;
        error.description = catalogError.description;
        error.hasCorrection = catalogError.has_correction;
        error.onFullText = catalogError.on_full_text;
        error.hasRelationFragment = catalogError.hasRelationFragment;
        error.disclosure = catalogError.disclosure;
        error.category = this.buildCategory(catalogError.category);
        error.fragments = this.buildFragments(catalogError.fragments);
        return error;
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
