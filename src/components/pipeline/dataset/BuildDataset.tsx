import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useGlobalEnv} from "../../context/GlobalEnvironment";
import {PIPELINE_MANAGER_URI} from "../../../util/URIConstants";
import {fetchData} from "../../../util/Fetch";
import {SessionExpiredError} from "../../error/SessionExpiredError";
import {DataNotFoundError} from "../../error/DataNotFoundError";
import {EMPTY} from "../../../util/Constants";
import {defaultEmptyDatasetDetails} from "./DatasetModelUtil";
import {DatasetInputParameters} from "./DatasetInputParameters";
import {ContentRenderHandler} from "../../error/ContentRenderHandler";

export const BuildDataset = () => {
    const {setExistingRecord, setDatasetDetails, setPolygenicScoreIds} = useGlobalEnv();
    const {datasetId} = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
    const [dataNotFound, setDataNotFound] = useState<string>(EMPTY);
    const [serverErrorMsg, setServerErrorMsg] = useState<string>(EMPTY);
    const datasetURI = PIPELINE_MANAGER_URI + "/dataset/{datasetId}";
    const dataNotFoundErrorMsg = " Dataset not found for " + datasetId + "!";

    useEffect(() => {
        const getDatasetDetails = async () => {
            setIsLoading(true);
            if (datasetId) {
                setExistingRecord(true);
                await fetchData(datasetURI.replace('{datasetId}', datasetId))
                    .then(response => {
                        setDatasetDetails(JSON.parse(response));
                        setDataNotFound(EMPTY);
                    })
                    .catch(reason => {
                        if (reason instanceof SessionExpiredError) {
                            setIsSessionExpired(true);
                        } else if (reason instanceof DataNotFoundError) {
                            setDataNotFound(dataNotFoundErrorMsg);
                        } else {
                            setServerErrorMsg(reason.message);
                        }
                    })
                    .finally(() => {
                        setIsLoading(false);
                    })
            } else {
                setDatasetDetails(() => defaultEmptyDatasetDetails());
                setExistingRecord(false);
                setDataNotFound(EMPTY);
                setIsLoading(false);
            }
            setPolygenicScoreIds(EMPTY);
        }
        getDatasetDetails().then();
    }, []);
    return <ContentRenderHandler
        isLoading={isLoading}
        isSessionExpired={isSessionExpired}
        serverErrorMsg={serverErrorMsg}
        dataNotFound={dataNotFound}
        data={<DatasetInputParameters/>}/>;
}
