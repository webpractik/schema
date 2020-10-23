import { AbstractCheckSchema } from '../validators/checks/abstractCheckSchema';
import { TextHandler } from '../validators/checks/mixins/textHandler';

export function isTextHandler(
  check: AbstractCheckSchema | TextHandler,
): check is TextHandler {
  return (<TextHandler>check).setValidatesCallback !== undefined;
}
