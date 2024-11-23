import {useNavigate, useParams} from "react-router-dom";
import React, {CSSProperties, useEffect, useState} from "react";
import {EMPTY} from "../../util/Constants";
import {DOWNLOAD_RESULTS_URI, PGS_CALCULATOR, PIPELINE_MANAGER_URI} from "../../util/URIConstants";
import {fetchData} from "../../util/Fetch";
import {SessionExpiredError} from "../error/SessionExpiredError";
import {DataNotFoundError} from "../error/DataNotFoundError";
import {defaultEmptyPipelineDetails, PipelineDetailsType} from "./PipelineModelUtil";
import {formatTimestamp} from "../../util/UtilityFunctions";
import {ContentRenderHandler} from "../error/ContentRenderHandler";

const TableWidth: CSSProperties = {
    width: "100%"
}

const EmptyTdHeight: CSSProperties = {
    height: "35px"
}

export const PipelineDetails = () => {
    const {pipelineId} = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pipelineDetails, setPipelineDetails] = useState<PipelineDetailsType>(defaultEmptyPipelineDetails());
    const [dataNotFound, setDataNotFound] = useState<string>(EMPTY);
    const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
    const [serverErrorMsg, setServerErrorMsg] = useState<string>(EMPTY);
    const navigate = useNavigate();
    const pipelineURI = PIPELINE_MANAGER_URI + "/pipeline/{pipelineId}";
    const dataNotFoundErrorMsg = "Pipeline details not found for " + pipelineId + "!";

    useEffect(() => {
        setIsLoading(true);
        fetchData(pipelineURI.replace('{pipelineId}', pipelineId ? pipelineId : EMPTY))
            .then(responseBody => {
                const responseBodyAsJson = JSON.parse(responseBody);
                setPipelineDetails(responseBodyAsJson);
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
    }, [pipelineURI, pipelineId]);

    const downloadResults = () => {
        navigate(DOWNLOAD_RESULTS_URI + "?pipelineId=" + pipelineId);
    }

    const navigateToPipelines = () => {
        navigate(PGS_CALCULATOR + "/pipelines");
    }

    const renderContent = (
        <div className="vf-content">
            <br/>
            <button className="vf-link-button" type="button" onClick={() => navigateToPipelines()}>Back</button>
            <h1 className="vf-text vf-text-heading--1">Pipeline Details</h1>
            <table style={TableWidth}>
                <tbody>
                <tr>
                    <th><h4 className="vf-text vf-text-heading--4">Pipeline: [All times in UTC]</h4></th>
                </tr>
                <tr>
                    <td><h4 className="vf-text vf-text-heading--5">Pipeline ID</h4></td>
                    <td><span className="vf-badge vf-badge--primary">{pipelineDetails.pipelineId}</span></td>
                    <td>&nbsp;</td>
                    <td><h4 className="vf-text vf-text-heading--5">Status</h4></td>
                    <td>{pipelineDetails.pipelineStatus}</td>
                </tr>
                {pipelineDetails.pipelineStatus.toUpperCase() === "FAILED" &&
                    <tr>
                        <td><h4 className="vf-text vf-text-heading--5">Trace Name</h4></td>
                        <td>{pipelineDetails.traceName}</td>
                        <td>&nbsp;</td>
                        <td><h4 className="vf-text vf-text-heading--5">Trace Exit</h4></td>
                        <td>{pipelineDetails.traceExit}</td>
                    </tr>}
                <tr>
                    <td><h4 className="vf-text vf-text-heading--5">Submitted On</h4></td>
                    <td>{formatTimestamp(pipelineDetails.submittedOn)}</td>
                    <td>&nbsp;</td>
                    <td><h4 className="vf-text vf-text-heading--5">Started On</h4></td>
                    <td>{formatTimestamp(pipelineDetails.startedOn)}</td>
                </tr>
                <tr>
                    <td><h4 className="vf-text vf-text-heading--5">Ended On</h4></td>
                    <td>{formatTimestamp(pipelineDetails.endedOn)}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                {pipelineDetails.pipelineStatus.toUpperCase() === "COMPLETED" &&
                    <tr>
                        <td colSpan={2}>
                            <button className="vf-button vf-button--secondary vf-button--sm"
                                    onClick={() => downloadResults()}>Download results
                            </button>
                        </td>
                    </tr>
                }
                </tbody>
                <tbody>
                <tr>
                    <td style={EmptyTdHeight}></td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th><h4 className="vf-text vf-text-heading--4">Dataset:</h4></th>
                </tr>
                <tr>
                    <td><h4 className="vf-text vf-text-heading--5">Dataset Id</h4></td>
                    <td>{pipelineDetails.datasetDetails.datasetId}</td>
                    <td>&nbsp;</td>
                    <td><h4 className="vf-text vf-text-heading--5">Genome Build</h4></td>
                    <td>{pipelineDetails.datasetDetails.genomeBuild}</td>
                </tr>
                <tr>
                    <td><h4 className="vf-text vf-text-heading--5">Sample set name</h4></td>
                    <td>{pipelineDetails.datasetDetails.datasetName}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <td style={EmptyTdHeight}></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
    return <ContentRenderHandler
        isLoading={isLoading}
        isSessionExpired={isSessionExpired}
        serverErrorMsg={serverErrorMsg}
        dataNotFound={dataNotFound}
        data={renderContent}/>;
}
