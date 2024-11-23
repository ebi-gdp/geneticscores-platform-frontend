import React, {useContext, useState} from "react";
import {DatasetDetailsType, defaultEmptyDatasetDetails} from "../pipeline/dataset/DatasetModelUtil";
import {GlobalEnvContext, GlobalEnvContextType} from "./GlobalEnvContext";
import {EMPTY} from "../../util/Constants";

const GlobalEnvironment = (props: any) => {
    const [existingRecord, setExistingRecord] = useState<boolean>(false);
    const [datasetDetails, setDatasetDetails] = useState<DatasetDetailsType>(defaultEmptyDatasetDetails());
    const [polygenicScoreIds, setPolygenicScoreIds] = useState<string>(EMPTY);

    // Handle fields change
    const handleChangeUserInput = (event: any) => {
        const {name, value} = event.target;
        if (name === "username") {
            setDatasetDetails({
                ...datasetDetails,
                globusDetails: {
                    ...datasetDetails.globusDetails,
                    [name]: value,
                }
            })
        } else {
            setDatasetDetails({
                ...datasetDetails,
                [name]: value
            });
        }
    };

    const updateUserInput = (name: string, value: any) => {
        setDatasetDetails(prevState => ({
            ...prevState,
            [name]: value.trim()
        }));
    }

    const globalEnvVars: GlobalEnvContextType = {
        existingRecord,
        setExistingRecord,
        datasetDetails,
        setDatasetDetails,
        polygenicScoreIds,
        setPolygenicScoreIds,
        handleChangeUserInput,
        updateUserInput
    };
    return <GlobalEnvContext.Provider value={globalEnvVars} {...props}/>;
};
const useGlobalEnv = () => useContext(GlobalEnvContext);
export {GlobalEnvironment, useGlobalEnv};
