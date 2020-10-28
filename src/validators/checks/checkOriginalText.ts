import { AbstractCheckSchema } from './abstractCheckSchema';
import { ValidationResult } from '../validationResult';
import { Schema } from '../../schema/schema';
import { ValidationErrorDto } from '../../support/dto/validators/validationError.dto';

export class CheckOriginalText extends AbstractCheckSchema {
  private readonly _textCheckCallback: (
    publicId: string,
    text: string,
  ) => boolean;
  protected readonly errCode = 'err-text-handler-callback';
  protected readonly errDescription = 'Переданный текст не соответствует неразмеченному тексту';

  constructor(callback: (publicId: string, text: string) => boolean) {
    super();
    this._textCheckCallback = callback;
  }

  public validate(schema: Schema): ValidationResult {
    const errors: ValidationErrorDto[] = [];
    if (this._textCheckCallback !== undefined) {
      const resultCallback = this._textCheckCallback(
        schema.meta.id,
        schema.text,
      );
      if (!resultCallback) {
        errors.push(new ValidationErrorDto(this.errCode, this.errDescription));
      }
    }
    return this.createNewValidationResult(errors);
  }
}
