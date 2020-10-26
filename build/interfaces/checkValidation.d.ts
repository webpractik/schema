import { Schema } from '../schema/schema';
export interface CheckValidation {
    validate(schema: Schema): void;
}
