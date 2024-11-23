import {UserDetails} from "../auth/UserContext";
import {USER_MANAGER_URI} from "../util/URIConstants";
import {POST} from "../util/Constants";

export const fetchUserDetailsAPI = async (): Promise<{ status: number; userDetails: UserDetails | null }> => {
    const response = await fetch(USER_MANAGER_URI + "/user/account");
    const responseStatus = response.status;
    if (responseStatus === 200) {
        const userDetails = await response.json();
        return userAccountDetailsSuccess(responseStatus, userDetails);
    } else {
        return userAccountDetailsFailure(responseStatus);
    }
}

export const createAccountAPI = async (): Promise<{ status: number; userDetails: UserDetails | null }> => {
    const response = await fetch(USER_MANAGER_URI + "/user/account", {
        method: POST
    });
    const responseStatus = response.status;
    if (responseStatus === 201) {
        const userDetails = await response.json();
        return userAccountDetailsSuccess(responseStatus, userDetails);
    } else {
        return userAccountDetailsFailure(responseStatus);
    }
}

const userAccountDetailsSuccess = (responseStatus: number, userDetails: UserDetails) => {
    return {
        status: responseStatus,
        userDetails: {
            accountId: userDetails.accountId,
            givenName: userDetails.givenName,
            familyName: userDetails.familyName,
            emailId: userDetails.emailId,
            consentType: userDetails.consentType
        }
    }
}

const userAccountDetailsFailure = (responseStatus: number) => {
    return {
        status: responseStatus,
        userDetails: null
    }
}
