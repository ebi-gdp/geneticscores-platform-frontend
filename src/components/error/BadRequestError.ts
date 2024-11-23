import ClientError, {ResponseDataType} from "./ClientError";

export class BadRequestError extends ClientError {
    constructor({message, responseData = null}: ResponseDataType) {
        super({message, responseData});
        this.name = "BadRequestError";
    }
}
