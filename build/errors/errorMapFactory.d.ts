import { ErrorDto } from '../support/dto/errors/error.dto';
import { ErrorsMap } from './errorsMap';
export declare class ErrorMapFactory {
    private readonly CATALOG_SERVICE_URL;
    private readonly SUBJECTS;
    private readonly CACHING_TIME;
    private _map;
    get map(): ErrorsMap;
    static createErrorMap(): Promise<ErrorsMap>;
    private constructor();
    refreshMap(): Promise<ErrorsMap>;
    private createErrorsMap;
    private buildMap;
    private fillMap;
    getErrorsBySubject(subject: string): Promise<ErrorDto[]>;
    private buildErrors;
    private buildErrorFromCategory;
    private buildCategory;
    private buildFragments;
    private buildErrorFragment;
}
