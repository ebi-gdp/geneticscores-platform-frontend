import {Link, useNavigate} from "react-router-dom";
import {menuTextColor} from "../NavigationBar";
import {ValidateSessionType} from "../AuthorizedNavigation";
import {DPA_URI} from "../../util/URIConstants";

export const DPAConsentNavigation = ({validateSession}: ValidateSessionType) => {
    const navigation = useNavigate();

    const navigateToDPA = () => {
        validateSession();
        navigation(DPA_URI);
    }
    return (
        <>
            <li className="vf-navigation__item" key="dpa">
                <Link className="vf-navigation__link vf-mega-menu__link"
                      style={menuTextColor}
                      to="#"
                      onClick={(event) => {
                          event.preventDefault();
                          navigateToDPA();
                      }}>DPA</Link>
            </li>
        </>
    );
}
