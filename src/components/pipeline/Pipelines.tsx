import React, {useEffect, useState} from "react";
import {PIPELINE_MANAGER_URI} from "../../util/URIConstants";
import {fetchData} from "../../util/Fetch";
import {SessionExpiredError} from "../error/SessionExpiredError";
import {defaultEmptyPipelines, PipelinesType} from "./PipelineModelUtil";
import Pagination from "./Pagination";
import "../../css/general.css"
import {EMPTY} from "../../util/Constants";
import {SortablePipelines} from "./SortablePipelines";
import {ContentRenderHandler} from "../error/ContentRenderHandler";

export const Pipelines = () => {
    const [pageOffset, setPageOffset] = useState<number>(0);
    const [pipelines, setPipelines] = useState<PipelinesType>(defaultEmptyPipelines());
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
    const [serverErrorMsg, setServerErrorMsg] = useState<string>(EMPTY);
    const pipelineURI = PIPELINE_MANAGER_URI + "/pipeline";

    useEffect(() => {
        setIsLoading(true);
        fetchData(pipelineURI + "?page=" + pageOffset + "&size=10")
            .then(responseBody => {
                setPipelines(JSON.parse(responseBody));
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
    }, [pipelineURI, pageOffset]);

    const handlePageChange = (event: any) => {
        setPageOffset(event.selected);
    }

    const renderContent = (
        <>
            <SortablePipelines data={pipelines.data}/>
            <br/>
            <div className="pagination">
                <Pagination
                    pageCount={Math.ceil(pipelines.count / 10)}
                    onPageChange={handlePageChange}
                    pageOffset={pageOffset}
                />
            </div>
            <div className="spacer"/>
        </>
    );
    return <ContentRenderHandler
        isLoading={isLoading}
        isSessionExpired={isSessionExpired}
        serverErrorMsg={serverErrorMsg}
        dataNotFound={pipelines.count <= 0 ? "Pipeline(s) not found!" : EMPTY}
        data={renderContent}/>;
}
