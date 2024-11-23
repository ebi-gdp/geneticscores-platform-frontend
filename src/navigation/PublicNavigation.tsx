import {Link} from "react-router-dom";
import {menuTextColor} from "./NavigationBar";

export const PublicNav = () => {
    return (
        <>
            <li className="vf-navigation__item"
                key="documentation">
                <Link target="_blank"
                      className="vf-navigation__link vf-mega-menu__link"
                      to="https://docs.google.com/document/d/1bG2AcmIqtQMQDnnzUOFaoZh46WkNTDiwRd1ttlqJAyU/edit?usp=sharing"
                      style={menuTextColor}>Overview</Link>
            </li>
            <li className="vf-navigation__item"
                key="documentation">
                <Link target="_blank"
                      className="vf-navigation__link vf-mega-menu__link"
                      to="https://docs.intervenegeneticscores.org"
                      style={menuTextColor}>Documentation</Link>
            </li>
        </>
    );
}
