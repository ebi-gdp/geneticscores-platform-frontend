import React, {useState} from "react";
import "../../../css/general.css";
import {CombinedStepAction} from "./DatasetInputParameters";
import {useGlobalEnv} from "../../context/GlobalEnvironment";
import {EMPTY} from "../../../util/Constants";

export const GenomeBuild = ({previousStep, nextStep}: CombinedStepAction) => {
    const genomeBuildGRCh37 = "GRCh37";
    const genomeBuildGRCh38 = "GRCh38";
    const [genomeBuildErrors, setGenomeBuildErrors] = useState<string>(EMPTY);
    const [sampleSetNameErrors, setSampleSetNameErrors] = useState<string>(EMPTY);
    const {existingRecord, datasetDetails, handleChangeUserInput} = useGlobalEnv();
    const [isDisabled] = useState<boolean>(existingRecord);
    const validSampleSetNameRegexPattern = /^(?![rR][eE][fF][eE][rR][eE][nN][cC][eE]$)[a-zA-Z0-9-]{8,50}$/;

    const validateUserInput = () => {
        let errors = false;
        if (datasetDetails.genomeBuild === EMPTY) {
            errors = true;
            setGenomeBuildErrors("Select Genome Build!");
        } else {
            setGenomeBuildErrors(EMPTY);
        }

        if (!validSampleSetNameRegexPattern.test(datasetDetails.datasetName)) {
            errors = true;
            setSampleSetNameErrors("Please enter a valid sample set name");
        } else {
            setSampleSetNameErrors(EMPTY);
        }

        if (!errors) {
            if (isDisabled) {
                nextStep(3);
            } else {
                nextStep(1);
            }
        }
    }
    return (
        <div className="vf-content">
            <br/>
            <button className="vf-link-button" type="button" onClick={() => previousStep(1)}>Back</button>
            <h1>What is the build of your genomes?</h1>
            <p className="vf-content__standsecond">
                We need to know the human genome reference build coordinates of your data in order to analyse it:
            </p>
            <div className="vf-form__item vf-form__item--radio div-content-margin">
                <input type="radio"
                       name="genomeBuild"
                       value={genomeBuildGRCh38}
                       id="1"
                       className="vf-form__radio"
                       checked={datasetDetails.genomeBuild.toUpperCase() === genomeBuildGRCh38.toUpperCase()}
                       onChange={handleChangeUserInput}
                       disabled={isDisabled}/>
                <label htmlFor="1" className="vf-form__label">GRCh38</label>
            </div>
            <div className="vf-form__item vf-form__item--radio div-content-margin">
                <input type="radio"
                       name="genomeBuild"
                       value={genomeBuildGRCh37}
                       id="2"
                       className="vf-form__radio"
                       checked={datasetDetails.genomeBuild.toUpperCase() === genomeBuildGRCh37.toUpperCase()}
                       onChange={handleChangeUserInput}
                       disabled={isDisabled}/>
                <label htmlFor="2" className="vf-form__label">GRCh37</label>
            </div>
            <div className="red-text" id="genome-build-error">{genomeBuildErrors !== EMPTY &&
                <span>{genomeBuildErrors}</span>}</div>
            <br/>
            <h1>Name your data as a sample set</h1>
            <p className="vf-text-body vf-text-body--3">We will use this name to help you keep track of your uploaded data and results.
                A sample set should contain files that relate to the same group of individuals.</p>
            <p className="vf-text-body vf-text-body--3">Enter between 8 to 50 alphanumeric characters and ‘-’ characters only. The word ‘reference’ alone is not allowed.</p>
            <br/>
            <div className="vf-grid">
                <form className="vf-stack vf-stack--400">
                    <div className="vf-grid vf-grid__col-2">
                        <div className="vf-form__item vf-stack">
                            <label htmlFor="datasetName" className="text-heading">Your sample set name:</label>
                            <input type="text"
                                   name="datasetName"
                                   id="datasetName"
                                   value={datasetDetails.datasetName}
                                   className="vf-form__input"
                                   onChange={handleChangeUserInput}
                                   disabled={isDisabled}/>
                        </div>
                    </div>
                </form>
            </div>
            <div className="red-text" id="sample-set-name-error">{sampleSetNameErrors !== EMPTY &&
                <span>{sampleSetNameErrors}</span>}</div>
            <br/>
            <button className="vf-button vf-button--primary vf-button--sm"
                    onClick={validateUserInput}>Continue
            </button>
        </div>
    );
}
