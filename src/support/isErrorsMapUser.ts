import { ErrorsMapUser } from "../validators/checks/mixins/errorsMapUser";
import { AbstractCheckSchema } from "../validators/checks/abstractCheckSchema";

export function isErrorsMapUser(check: AbstractCheckSchema | ErrorsMapUser): check is  ErrorsMapUser {
    return (<ErrorsMapUser>check).setErrorsMap !== undefined;
}
