import {useAuth} from "../auth/UserProvider";
import {Navigate} from "react-router-dom";
import {LandingPageContent} from "./LandingPageContent";
import {REVOKED} from "../util/Constants";
import {DPA_URI, PGS_CALCULATOR} from "../util/URIConstants";

export const LandingPage = () => {
    const {isAuthenticated, user, login} = useAuth();

    if (isAuthenticated) {
        if (user?.consentType === REVOKED) {
            return <Navigate to={DPA_URI}/>;
        } else {
            return <Navigate to={PGS_CALCULATOR}/>;
        }
    } else {
        return <LandingPageContent login={login}/>;
    }
}
