import {
    DatasetDetailsType,
    defaultEmptyDatasetDetails,
    defaultEmptyGlobusDetails,
    GlobusDetailsType
} from "./dataset/DatasetModelUtil";
import {EMPTY} from "../../util/Constants";

export interface PipelineDetailsType {
    pipelineId: string,
    pipelineStatus: string,
    traceName: string,
    traceExit: string,
    submittedOn: string,
    startedOn: string,
    endedOn: string,
    datasetDetails: DatasetDetailsType,
    globusDetails: GlobusDetailsType
}

export const defaultEmptyPipelineDetails = (): PipelineDetailsType => {
    return {
        pipelineId: EMPTY,
        pipelineStatus: EMPTY,
        traceName: EMPTY,
        traceExit: EMPTY,
        submittedOn: EMPTY,
        startedOn: EMPTY,
        endedOn: EMPTY,
        datasetDetails: defaultEmptyDatasetDetails(),
        globusDetails: defaultEmptyGlobusDetails()
    };
}

export interface PipelinesType {
    data: [PipelineDetailsType],
    count: number
}

export const defaultEmptyPipelines = (): PipelinesType => {
    return {
        data: [defaultEmptyPipelineDetails()],
        count: 0
    }
}
