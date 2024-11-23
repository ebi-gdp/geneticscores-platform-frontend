import {useAuth} from "../../auth/UserProvider";
import {Navigate} from "react-router-dom";
import {ProcessLoadingSpinner} from "../ProcessLoadingSpinner";
import {GIVEN, PREVIOUS_PAGE_URL} from "../../util/Constants";
import {DatasetLandingPage} from "./dataset/DatasetLandingPage";
import React from "react";
import {CreateAccount} from "../user/CreateAccount";
import {DPA_URI, LANDING_PAGE} from "../../util/URIConstants";
import {UnauthorisedNavigate} from "../../auth/UnauthorisedNavigate";

export const PGSCalculator = () => {
    const {isLoading, isAuthenticated, user} = useAuth();

    if (isLoading) {
        return <ProcessLoadingSpinner/>;
    } else if (!isAuthenticated) {
        return <UnauthorisedNavigate/>;
    } else if (user !== null) {
        if (user.consentType === GIVEN) {
            const previousPageUrl = localStorage.getItem(PREVIOUS_PAGE_URL);
            if (previousPageUrl !== null) {
                localStorage.removeItem(PREVIOUS_PAGE_URL);
                return <Navigate to={previousPageUrl}/>;
            } else {
                return <DatasetLandingPage/>;
            }
        } else {
            window.location.href = LANDING_PAGE + DPA_URI;
            return <></>;//<Navigate to={DPA_URI}/>;
        }
    } else {
        return <CreateAccount/>;
    }
}
