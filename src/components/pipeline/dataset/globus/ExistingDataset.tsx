import {EMPTY} from "../../../../util/Constants";
import React from "react";
import {PreviousStepAction} from "../DatasetInputParameters";
import {DatasetNameType} from "./DatasetNotActive";

export interface ExistingRecordType extends DatasetNameType, PreviousStepAction {
    openDirOnGuestCollection: () => void,
    downloadPublicKey: (args: string, publicKey: any) => void,
    publicKeyDetails: PublicKeyDetailsType
    validateFiles: () => void,
    errors: string
}

export interface PublicKeyDetailsType {
    datasetId: string,
    publicKey: any
}

export const ExistingDataset = ({
                                    previousStep, datasetName, openDirOnGuestCollection,
                                    downloadPublicKey, publicKeyDetails, validateFiles, errors
                                }: ExistingRecordType) => {
    return (
        <>
            <div className="vf-content">
                <br/>
                <button className="vf-link-button" type="button"
                        onClick={() => previousStep(1)}>Back
                </button>
                <h1>Continue with previously uploaded data</h1><br/>
                <h4>Sample set name: {datasetName}</h4>
                <p>
                    <button className="vf-button vf-button--secondary vf-button--sm"
                            onClick={() => downloadPublicKey(publicKeyDetails.datasetId + ".pub", publicKeyDetails.publicKey)}>Download the public encryption key for this data upload</button>
                </p>
                <p>
                    <button className="vf-button vf-button--secondary vf-button--sm"
                            onClick={() => openDirOnGuestCollection()}>View destination folder
                    </button>
                </p>
                <button className="vf-button vf-button--primary vf-button--sm"
                        onClick={() => validateFiles()}>I have transferred my data
                </button>
            </div>
            <div className="red-text" id="genome-build-error">{errors !== EMPTY &&
                <span>{errors}</span>}</div>
        </>
    );
}
