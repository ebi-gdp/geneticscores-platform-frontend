import React from "react";

import {PreviousStepAction} from "../dataset/DatasetInputParameters";
import {PIPELINE_MANAGER_URI} from "../../../util/URIConstants";
import {PGSGenericSearch, DefaultTerm} from "./PGSGenericSearch";

export interface PublicationType {
    pubId: string,
    key: string,
    pubIdsCount: number
}

export const SelectPolygenicScoresByPublication = ({previousStep}: PreviousStepAction) => {
    const defaultSearchTerm: DefaultTerm = {
        defaultTermOne: "35065983",
        defaultTermTwo: "10.1053/j.gastro.2022.01.016",
    };
    return <PGSGenericSearch
        searchType="Publication"
        previousStep={previousStep}
        pgsIdsCatalogURL={PIPELINE_MANAGER_URI + "/pipeline/publication-data"}
        pipelineExecutionURL={PIPELINE_MANAGER_URI + "/pipeline/{pipelineId}/execute/publication-ids"}
        pgsIdsScoreURL={"https://www.pgscatalog.org/publication/"}
        defaultTerm={defaultSearchTerm}
    />
}
