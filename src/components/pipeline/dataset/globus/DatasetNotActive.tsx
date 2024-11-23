import React from "react";
import {PreviousStepAction} from "../DatasetInputParameters";

export interface DatasetNameType {
    datasetName: string
}

export interface DatasetNotActiveType extends PreviousStepAction, DatasetNameType {
    deleted: boolean,
    expired: boolean
}

export const DatasetNotActive = ({previousStep, datasetName, deleted, expired}: DatasetNotActiveType) => {
    return (
        <div className="vf-content">
            <br/>
            <button className="vf-link-button" type="button"
                    onClick={() => previousStep(1)}>Back
            </button>
            <br/>
            <br/>
            <h4>{datasetName}</h4>
            <h5><span
                className="red-text">{deleted ? "Dataset is deleted!" : (expired ? "Dataset is expired!" : "")}</span>
            </h5>
        </div>
    );
}
