import React, {CSSProperties} from "react";
import {PreviousStepAction} from "../dataset/DatasetInputParameters";
import {PIPELINE_MANAGER_URI} from "../../../util/URIConstants";
import {PGSGenericSearch, DefaultTerm} from "./PGSGenericSearch";

export interface ScoreType {
    id: string,
    label: string,
    pgsIdsSize: number
}

export const ulStyleBuilder = (height: number) => {
    return {
        height: height + "px",
        overflow: 'auto'
    };
}

export const redText: CSSProperties = {
    color: "red"
}

export const TRAIT_SEARCH = "Trait";

export const SelectPolygenicScoresByTrait = ({previousStep}: PreviousStepAction) => {
    const defaultSearchTerm: DefaultTerm = {
        defaultTermOne: "breast cancer",
        defaultTermTwo: "EFO_0001365",
    };
    return <PGSGenericSearch
        searchType={TRAIT_SEARCH}
        previousStep={previousStep}
        pgsIdsCatalogURL={PIPELINE_MANAGER_URI + "/pipeline/pgs-ids-catalog-traits"}
        pipelineExecutionURL={PIPELINE_MANAGER_URI + "/pipeline/{pipelineId}/execute/trait-ids"}
        pgsIdsScoreURL={"https://www.pgscatalog.org/trait/"}
        defaultTerm={defaultSearchTerm}
    />
}
