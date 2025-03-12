import React from "react";
import {CombinedStepAction} from "../dataset/DatasetInputParameters";

export const SelectPolygenicScoresLandingPage = ({previousStep, nextStep}: CombinedStepAction) => {
    return (
        <div className="vf-content">
            <br/>
            <button className="vf-link-button" type="button" onClick={() => previousStep(1)}>Back</button>
            <h1>Select your polygenic score(s)</h1>
            <br/>
                <h4>Please select one of the following options to proceed</h4>
            <br/>
            <div>
                <dl className="vf-list vf-list--definition">
                    <dt className="vf-list__item vf-list--definition__term">
                        <button className="vf-button vf-button--primary vf-button--sm"
                                  onClick={() => nextStep(1)}>Select
                        Polygenic Scores by Trait</button></dt>
                    <dt className="vf-list__item vf-list--definition__term">
                        <button className="vf-button vf-button--primary vf-button--sm"
                                  type="button"
                                  onClick={() => nextStep(2)}>Select
                        Polygenic Scores by Publication(s)</button></dt>
                    <dt className="vf-list__item vf-list--definition__term">
                        <button className="vf-button vf-button--primary vf-button--sm"
                                  type="button"
                                  onClick={() => nextStep(3)}>Add Polygenic Scores ID(s)</button></dt>
                </dl>
            </div>
        </div>
    );
}
