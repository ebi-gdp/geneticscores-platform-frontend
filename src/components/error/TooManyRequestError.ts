import ClientError from "./ClientError";

export class TooManyRequestError extends ClientError {
    constructor(message: string) {
        super({message});
        this.name = "TooManyRequestError";
    }
}
