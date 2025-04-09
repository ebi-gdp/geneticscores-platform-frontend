import {PublicNav} from "./PublicNavigation";
import {AuthorizedNavigation} from "./AuthorizedNavigation";
import {CSSProperties} from "react";
import "../css/header.css";
import {GENETIC_SCORES_ORG} from "../util/URIConstants";

const headerStyle: CSSProperties = {
    background: "#007AC3",
    minHeight: "55px"
}

export const textDecoration: CSSProperties = {
    textDecoration: "none"
}

export const menuTextColor: CSSProperties = {
    color: "#ffffff"
}

export const NavigationBar = () => {
    return (
        <>
            <div className="header">
                {/*
                <header className="vf-global-header vf-mega-menu header-menu">
                <span
                    className="under-development"><b>Under development - suitable for non-sensitive data only</b></span>
                </header>
                */}
                <header className="vf-global-header vf-mega-menu" style={headerStyle} role="menubar">
                    <a href={GENETIC_SCORES_ORG} style={textDecoration}>
                    <span style={textDecoration}
                          className="vf-logo__text intervene-title intervene-title-extended">GeneticScores.org</span>
                    </a>
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
