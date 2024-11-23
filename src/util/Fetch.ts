import {APPLICATION_JSON, DELETE, GET, PLAIN_TEXT, POST} from "./Constants";
import {SessionExpiredError} from "../components/error/SessionExpiredError"
import {BadRequestError} from "../components/error/BadRequestError";
import {DataNotFoundError} from "../components/error/DataNotFoundError";
import ClientError from "../components/error/ClientError";
import {ServerError} from "../components/error/ServerError";

export const fetchData = async (url: string) => {
    const response = await fetch(url, {
        method: GET,
        headers: {
            "Accept": APPLICATION_JSON
        }
    });
    return await handleResponse(response);
}

export const postJsonData = async (url: string,
                                   requestBody: any) => {
    const response = await fetch(url, {
        method: POST,
        headers: {
            "Content-Type": APPLICATION_JSON,
            "Accept": APPLICATION_JSON
        },
        body: JSON.stringify(requestBody)
    });
    return await handleResponse(response);
}

export const postPlainData = async (url: string,
                                    requestBody: any) => {
    const response = await fetch(url, {
        method: POST,
        headers: {
            "Content-Type": PLAIN_TEXT,
            "Accept": APPLICATION_JSON
        },
        body: requestBody
    });
    return await handleResponse(response);
}

export const postRequest = async (url: string) => {
    const response = await fetch(url, {
        method: POST,
    });
    return await handleResponse(response);
}

export const deleteRequest = async (url: string) => {
    const response = await fetch(url, {
        method: DELETE,
    });
    return await handleResponse(response);
}

const handleResponse = async (response: any) => {
    const httpStatus = response.status;
    if (httpStatus === 200 || httpStatus === 201 || httpStatus === 202) {
        return await response.text();
    } else if (httpStatus === 401 || httpStatus === 403) {
        throw new SessionExpiredError("Session expired");
    } else if (httpStatus === 400) {
        const responseData = await response.json();
        throw new BadRequestError({message: "Bad request", responseData});
    } else if (httpStatus === 404) {
        throw new DataNotFoundError("Data not found");
    } else if (httpStatus > 400 && httpStatus < 500) {
        throw new ClientError({message: "Client error http status: " + httpStatus});
    } else {
        throw new ServerError("Error while processing request! Please try after sometime.");
    }
}
