export interface ResponseDataType {
    responseData?: any | null,
    message: string
}

class ClientError extends Error {
    responseData?: any | null;

    constructor({message, responseData = null}: ResponseDataType) {
        super(message);
        this.responseData = responseData;
    }
}

export default ClientError;
