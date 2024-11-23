import {Link, useNavigate} from "react-router-dom";
import {menuTextColor} from "../NavigationBar";
import {ValidateSessionType} from "../AuthorizedNavigation";
import {PROFILE_URI} from "../../util/URIConstants";

export const Profile = ({validateSession}: ValidateSessionType) => {
    const navigation = useNavigate();

    const navigateToProfile = () => {
        validateSession();
        navigation(PROFILE_URI);
    }
    return (
        <>
            <li className="vf-navigation__item" key="profile">
                <Link className="vf-navigation__link vf-mega-menu__link"
                      style={menuTextColor}
                      to="#"
                      onClick={(event) => {
                          event.preventDefault();
                          navigateToProfile();
                      }}>Profile</Link>
            </li>
        </>
    );
}
