import {useNavigate} from "react-router-dom";
import {divHeight} from "../../LandingPageContent";
import {DATASET_URI, DATASETS_URI} from "../../../util/URIConstants";
import {isSessionExpiredGlobal} from "../../../util/UtilityFunctions";
import {useAuth} from "../../../auth/UserProvider";
import {UnauthorisedNavigate} from "../../../auth/UnauthorisedNavigate";
import React from "react";

export const DatasetLandingPage = () => {
    const {lastAccessTime, maxIdleTime} = useAuth();
    const navigate = useNavigate();

    const newSubmission = () => {
        navigate(DATASET_URI);
    }

    const datasets = () => {
        navigate(DATASETS_URI);
    }

    if (isSessionExpiredGlobal(lastAccessTime, maxIdleTime)) {
        return <UnauthorisedNavigate/>;
    } else {
        return (
            <div className="vf-content" style={divHeight}>
                <h1 className="vf-text vf-text-heading--1">PGS Calculator</h1>
                <br/>
                <h4>Set up a PGS Calculation pipeline (Start by providing or selecting target genomes)</h4>
                <button className="vf-button vf-button--primary vf-button--sm" onClick={() => newSubmission()}>Start
                    new
                    data upload
                </button>
                <button className="vf-button vf-button--primary vf-button--sm" onClick={() => datasets()}>Continue upload or view existing sample sets</button>
            </div>
        );
    }
}
