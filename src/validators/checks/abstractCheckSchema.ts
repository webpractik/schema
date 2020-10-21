import { CheckValidation } from "../../interfaces/checkValidation";
import { ErrorDto } from "../../support/dto/validators/error.dto";
import { SchemaDto } from "../../support/dto/schema/schema.dto";

export abstract class AbstractCheckSchema implements CheckValidation {

    protected errors: ErrorDto[] = [];
    protected errCode: string;
    protected errDescription: string;
    protected schema: SchemaDto;

    public abstract isValid(schema: string): boolean;

    public getErrors(): ErrorDto[] {
        return this.errors;
    }

    public setSchema(value: SchemaDto) {
        this.schema = value;
    }

    public refresh() {
        this.errors = [];
        this.schema = new SchemaDto();
    }

    protected hasNoErrors(): boolean {
        return (this.errors.length === 0);
    }

    protected createError(): ErrorDto {
        const error = new ErrorDto();
        error.code = this.errCode;
        error.description = this.errDescription;
        return error;
    }

    protected decodeSchema(schema: string): SchemaDto {
        const jsonSchema = JSON.parse(schema);
        if (!jsonSchema.selections) {
            throw new Error('В документе должен обязательно присутствовать массив selections');
        }
        return JSON.parse(schema);
    }

}
