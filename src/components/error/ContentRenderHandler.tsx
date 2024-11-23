import {ProcessLoadingSpinner} from "../ProcessLoadingSpinner";
import {UnauthorisedNavigate} from "../../auth/UnauthorisedNavigate";
import {EMPTY} from "../../util/Constants";
import {ErrorMessage} from "./ErrorMessage";
import React from "react";

interface ErrorHandlerType {
    isLoading: boolean,
    isSessionExpired: boolean,
    serverErrorMsg: string,
    dataNotFound?: string,
    consent?: ConsentType,
    data: React.JSX.Element
}

interface ConsentType {
    consent: boolean,
    userMessage: React.JSX.Element,
    redirectToHomePage: () => void
}

export const ContentRenderHandler = ({
                                         isLoading,
                                         isSessionExpired,
                                         serverErrorMsg,
                                         dataNotFound,
                                         consent,
                                         data
                                     }: ErrorHandlerType) => {
    if (isLoading) {
        return <ProcessLoadingSpinner/>;
    } else if (isSessionExpired) {
        return <UnauthorisedNavigate/>;
    } else if (serverErrorMsg !== EMPTY) {
        return <ErrorMessage errorMsg={serverErrorMsg}/>;
    } else if (dataNotFound != null && dataNotFound !== EMPTY) {
        return (
            <div className="vf-content">
                <br/>
                <h3>{dataNotFound}</h3>
            </div>);
    } else if (consent?.consent) {
        return (
            <>
                {consent.userMessage}
                <br/>
                <div className="button-center">
                    <button className="vf-button vf-button--primary vf-button--sm" onClick={consent.redirectToHomePage}>
                        Proceed
                    </button>
                </div>
            </>);
    }
    return <>{data}</>;
}
