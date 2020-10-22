import { ErrorDto } from "../support/dto/errors/error.dto";

export class ErrorsMap {
    public errors: Map<string, Map<string, ErrorDto>>;
}
