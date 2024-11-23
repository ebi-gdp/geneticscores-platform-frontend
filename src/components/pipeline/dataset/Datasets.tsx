import React, {useEffect, useState} from "react";
import {PIPELINE_MANAGER_URI} from "../../../util/URIConstants";
import {fetchData} from "../../../util/Fetch";
import {SessionExpiredError} from "../../error/SessionExpiredError";
import {DatasetsType, defaultEmptyDatasets} from "./DatasetModelUtil";
import "../../../css/general.css"
import {EMPTY} from "../../../util/Constants";
import {SortableDatasets} from "./SortableDatasets";
import {ContentRenderHandler} from "../../error/ContentRenderHandler";

export const Datasets = () => {
    const [pageOffset, setPageOffset] = useState<number>(0);
    const [datasets, setDatasets] = useState<DatasetsType>(defaultEmptyDatasets());
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
    const [serverErrorMsg, setServerErrorMsg] = useState<string>(EMPTY);
    const [reload, setReload] = useState(false);
    const datasetURI = PIPELINE_MANAGER_URI + "/dataset";

    useEffect(() => {
        setIsLoading(true);
        const getDatasets = async () => {
            await fetchData(
                datasetURI + "?page=" + pageOffset + "&size=10")
                .then(responseBody => {
                    setDatasets(JSON.parse(responseBody));
                    setIsLoading(false);
                })
                .catch(reason => {
                    if (reason instanceof SessionExpiredError) {
                        setIsSessionExpired(true);
                    } else {
                        setServerErrorMsg(reason.message);
                    }
                    setIsLoading(false);
                })
        }
        getDatasets().then();
    }, [datasetURI, pageOffset, reload]);

    const handlePageChange = (event: any) => {
        setPageOffset(event.selected);
    }

    const renderContent = (
        <SortableDatasets
            data={datasets.data}
            pageCount={Math.ceil(datasets.count / 10)}
            pageOffset={pageOffset}
            handlePageChange={handlePageChange}
            setReload={setReload}
        />
    );
    return <ContentRenderHandler
        isLoading={isLoading}
        isSessionExpired={isSessionExpired}
        serverErrorMsg={serverErrorMsg}
        dataNotFound={datasets.count <= 0 ? "Dataset(s) not found!" : EMPTY}
        data={renderContent}/>;
}
