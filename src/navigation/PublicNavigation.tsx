import {Link} from "react-router-dom";
import {menuTextColor} from "./NavigationBar";
import {DOCS_URL} from "../util/URIConstants";

export const PublicNav = () => {
    return (
        <li className="vf-navigation__item"
            key="documentation">
            <Link target="_blank"
                  className="vf-navigation__link vf-mega-menu__link"
                  to={DOCS_URL}
                  style={menuTextColor}>Documentation</Link>
        </li>
    );
}
