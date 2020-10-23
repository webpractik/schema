export class TextHandler {
  _textCheckCallback: (publicId: string, text: string) => boolean;

  public setValidatesCallback(
    callback: (publicId: string, text: string) => boolean,
  ): void {
    this._textCheckCallback = callback;
  }
}
