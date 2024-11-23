import {divHeight} from "./LandingPageContent";
import React from "react";
import {useAuth} from "../auth/UserProvider";
import {useNavigate} from "react-router-dom";
import {DATASETS_URI, PGS_CALCULATOR} from "../util/URIConstants";
import {isSessionExpiredGlobal} from "../util/UtilityFunctions";
import {UnauthorisedNavigate} from "../auth/UnauthorisedNavigate";

export const DashboardLandingPage = () => {
    const {lastAccessTime, maxIdleTime} = useAuth();
    const navigate = useNavigate();

    const pipelines = () => {
        navigate(PGS_CALCULATOR + "/pipelines");
    }

    const datasets = () => {
        navigate(DATASETS_URI);
    }

    if (isSessionExpiredGlobal(lastAccessTime, maxIdleTime)) {
        return <UnauthorisedNavigate/>;
    } else {
        return (
            <div className="vf-content" style={divHeight}>
                <h1 className="vf-text vf-text-heading--1">Dashboard</h1>
                <br/>
                <button className="vf-button vf-button--primary vf-button--sm" onClick={() => pipelines()}>View
                    pipelines
                </button>
                <button className="vf-button vf-button--primary vf-button--sm" onClick={() => datasets()}>View existing
                    sample sets
                </button>
            </div>
        );
    }
}
