import {useAuth} from "../auth/UserProvider";
import {Dashboard} from "./user/Dashboard";
import {Profile} from "./user/Profile";
import {Logout} from "./user/Logout";
import {DPAConsentNavigation} from "./user/DPAConsentNavigation";
import {EMPTY, GIVEN} from "../util/Constants";
import {isSessionExpiredGlobal} from "../util/UtilityFunctions";
import {UNAUTHORISED} from "../util/URIConstants";
import {useNavigate} from "react-router-dom";

export interface ValidateSessionType {
    validateSession: () => void
}

export const AuthorizedNavigation = () => {
    const {isAuthenticated, user, consentEvent, lastAccessTime, maxIdleTime} = useAuth();
    const navigation = useNavigate();

    const validateSession = () => {
        if (isSessionExpiredGlobal(lastAccessTime, maxIdleTime)) {
            navigation(UNAUTHORISED);
        }
    }

    if (isAuthenticated) {
        if (user !== null) {
            return (
                <>
                    <DPAConsentNavigation validateSession={validateSession}/>
                    {consentEvent === GIVEN ? <Dashboard validateSession={validateSession}/> : EMPTY}
                    <Profile validateSession={validateSession}/>
                    <Logout/>
                </>
            )
        } else {
            return <Logout/>;
        }
    } else {
        return null;
    }
}
