import {EMPTY} from "../../../util/Constants";

export interface GlobusDetailsType {
    guestCollectionId: string,
    dirPathOnGuestCollection: string,
    username: string,
    filesetId: string
}

export interface DatasetDetailsType {
    datasetId: string,
    datasetName: string,
    genomeBuild: string,
    filesetId: string,
    publicKey: string,
    expiresAt: string,
    expired: boolean,
    deleted: boolean,
    globusDetails: GlobusDetailsType
}

export const defaultEmptyDatasetDetails = (): DatasetDetailsType => {
    return {
        datasetId: EMPTY,
        datasetName: EMPTY,
        genomeBuild: EMPTY,
        expiresAt: EMPTY,
        expired: false,
        filesetId: EMPTY,
        publicKey: EMPTY,
        deleted: false,
        globusDetails: defaultEmptyGlobusDetails()
    };
}

export const defaultEmptyGlobusDetails = (): GlobusDetailsType => {
    return {
        guestCollectionId: EMPTY,
        dirPathOnGuestCollection: EMPTY,
        username: EMPTY,
        filesetId: EMPTY
    }
}

export interface DatasetsType {
    data: [DatasetDetailsType],
    count: number
}

export const defaultEmptyDatasets = (): DatasetsType => {
    return {
        data: [defaultEmptyDatasetDetails()],
        count: 0
    }
}

