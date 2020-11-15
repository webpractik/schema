export class ValidationErrorDto {
  code: string;
  description: string;
  trace: string;

  constructor(code: string, description: string, trace: string = '') {
    this.code = code;
    this.description = description;
    this.trace = trace;
  }
}
