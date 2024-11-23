import {useAuth} from "../../auth/UserProvider";
import {Navigate} from "react-router-dom";
import {EMPTY} from "../../util/Constants";
import {LANDING_PAGE} from "../../util/URIConstants";

export const ProfileDetails = () => {
    const {isAuthenticated, user} = useAuth();

    if (!isAuthenticated) {
        const landingPage = LANDING_PAGE === EMPTY ? "/" : LANDING_PAGE;
        return <Navigate to={landingPage}/>;
    } else {
        return (
            <div className="vf-content">
                <h1 className="vf-text vf-text-heading--1">User Profile</h1>
                <table>
                    <tbody className="vf-table__body">
                    <tr className="vf-table__row">
                        <td className="vf-table__cell">Name</td>
                        <td className="vf-table__cell"><h3
                            className="vf-profile__title vf-profile__link">{user?.givenName}&nbsp;{user?.familyName}</h3>
                        </td>
                    </tr>
                    <tr className="vf-table__row">
                        <td className="vf-table__cell">Account Id</td>
                        <td className="vf-table__cell"><p className="vf-profile__job-title">{user?.accountId}</p>
                        </td>
                    </tr>
                    <tr className="vf-table__row">
                        <td className="vf-table__cell">Email Id</td>
                        <td className="vf-table__cell"><p
                            className="vf-profile__email vf-profile__link vf-profile__link--primary">{user?.emailId}</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
