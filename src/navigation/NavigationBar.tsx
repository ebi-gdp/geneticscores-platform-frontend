import {Link, useNavigate} from "react-router-dom";
import {PublicNav} from "./PublicNavigation";
import {AuthorizedNavigation} from "./AuthorizedNavigation";
import {CSSProperties} from "react";
import "../css/header.css";
import {LANDING_PAGE} from "../util/URIConstants";

const headerStyle: CSSProperties = {
    background: "#007AC3"
}

export const textDecoration: CSSProperties = {
    textDecoration: "none"
}

export const menuTextColor: CSSProperties = {
    color: "#ffffff"
}

export const NavigationBar = () => {
    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate(LANDING_PAGE);
    }

    return (
        <>
            <div className="header">
                <header className="vf-global-header vf-mega-menu header-menu">
                <span
                    className="under-development"><b>Under development - suitable for non-sensitive data only</b></span>
                </header>
                <header className="vf-global-header vf-mega-menu" style={headerStyle} role="menubar">
                    <Link to="" style={textDecoration} onClick={() => navigateToHomePage()}>
                    <span style={textDecoration}
                          className="vf-logo__text intervene-title">GeneticScores.org</span>
                    </Link>
                    <nav className="vf-navigation vf-navigation--global | vf-cluster">
                        <ul className="vf-navigation__list | vf-list | vf-cluster__inner">
                            <PublicNav/>
                            <AuthorizedNavigation/>
                        </ul>
                    </nav>
                </header>
            </div>
        </>
    );
}
