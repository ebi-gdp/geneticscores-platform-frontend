import ClientError from "./ClientError";

export class DataNotFoundError extends ClientError {
    constructor(message: string) {
        super({message});
        this.name = "DataNotFoundError";
    }
}
