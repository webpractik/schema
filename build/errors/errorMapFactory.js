"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMapFactory = void 0;
const axios_1 = __importDefault(require("axios"));
const error_dto_1 = require("../support/dto/errors/error.dto");
const errorCategory_dto_1 = require("../support/dto/errors/errorCategory.dto");
const errorFragment_dto_1 = require("../support/dto/errors/errorFragment.dto");
const errorsMap_1 = require("./errorsMap");
class ErrorMapFactory {
    constructor() {
        this.CATALOG_SERVICE_URL = 'https://catalog-errors.readable.upgreat.one/errors';
        this.SUBJECTS = [
            'rus',
            'lit',
            'social',
            'hist',
            'eng',
            'rus-free',
            'eng-free',
        ];
        this.CACHING_TIME = 86400000;
    }
    get map() {
        return this._map;
    }
    static async createErrorMap() {
        const factory = new ErrorMapFactory();
        await factory.createErrorsMap();
        return factory.map;
    }
    async refreshMap() {
        return this.createErrorsMap();
    }
    async createErrorsMap() {
        this._map = await this.buildMap();
        setTimeout(this.createErrorsMap, this.CACHING_TIME);
        return this._map;
    }
    async buildMap() {
        const errorsMap = new errorsMap_1.ErrorsMap();
        errorsMap.errors = await this.fillMap();
        return errorsMap;
    }
    async fillMap() {
        const map = new Map();
        for (const subject of this.SUBJECTS) {
            map.set(subject, new Map());
            const errorsSubjectsMap = map.get(subject);
            const errors = await this.getErrorsBySubject(subject);
            errors.forEach((error) => errorsSubjectsMap.set(error.code.toLowerCase(), error));
        }
        return map;
    }
    getErrorsBySubject(subject) {
        return axios_1.default
            .get(this.CATALOG_SERVICE_URL + `?subject=${subject}`)
            .then((response) => {
            return this.buildErrors(response.data);
        });
    }
    buildErrors(catalogErrors) {
        let result = [];
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
    buildErrorFromCategory(catalogError) {
        const category = this.buildCategory(catalogError);
        return catalogError.errors.map((error) => {
            const errorDto = new error_dto_1.ErrorDto();
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
    buildCategory(catalogErrorCategory) {
        const category = new errorCategory_dto_1.ErrorCategoryDto();
        category.id = catalogErrorCategory.id;
        category.active = catalogErrorCategory.active;
        category.color = catalogErrorCategory.color;
        category.subjectCode = catalogErrorCategory.subject_code;
        category.order = catalogErrorCategory.order;
        category.name = catalogErrorCategory.name;
        category.comment = catalogErrorCategory.comment;
        return category;
    }
    buildFragments(catalogErrorFragments) {
        return catalogErrorFragments.map((fragment) => this.buildErrorFragment(fragment));
    }
    buildErrorFragment(catalogErrorFragment) {
        const fragment = new errorFragment_dto_1.ErrorFragmentDto();
        fragment.code = catalogErrorFragment.code;
        fragment.description = catalogErrorFragment.description;
        return fragment;
    }
}
exports.ErrorMapFactory = ErrorMapFactory;
