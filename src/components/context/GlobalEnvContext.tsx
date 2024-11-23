import {createContext} from "react";
import {EMPTY} from "../../util/Constants";
import {DatasetDetailsType, defaultEmptyDatasetDetails} from "../pipeline/dataset/DatasetModelUtil";

export interface GlobalEnvContextType {
    existingRecord: boolean,
    setExistingRecord: (arg: boolean) => void,
    datasetDetails: DatasetDetailsType,
    setDatasetDetails: (arg: any) => void,
    polygenicScoreIds: string,
    setPolygenicScoreIds: (arg: string) => void,
    handleChangeUserInput: (arg: any) => void,
    updateUserInput: (name: string, arg: any) => void
}

export const GlobalEnvContext = createContext<GlobalEnvContextType>({
    existingRecord: false,
    setExistingRecord: () => {
    },
    datasetDetails: defaultEmptyDatasetDetails(),
    setDatasetDetails: () => {
    },
    polygenicScoreIds: EMPTY,
    setPolygenicScoreIds: () => {
    },
    handleChangeUserInput: () => {
    },
    updateUserInput: () => {
    }
});
