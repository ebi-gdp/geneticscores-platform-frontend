import {Link} from "react-router-dom";
import {menuTextColor} from "./NavigationBar";

export const PublicNav = () => {
    return (
        <li className="vf-navigation__item"
            key="documentation">
            <Link target="_blank"
                  className="vf-navigation__link vf-mega-menu__link"
                  to="https://docs.intervenegeneticscores.org"
                  style={menuTextColor}>Documentation</Link>
        </li>
    );
}
