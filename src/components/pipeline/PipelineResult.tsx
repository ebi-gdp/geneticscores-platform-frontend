import React, {useEffect, useState} from "react";
import {PIPELINE_MANAGER_URI} from "../../util/URIConstants";
import {fetchData} from "../../util/Fetch";
import {DataNotFoundError} from "../error/DataNotFoundError";
import {APPLICATION_OCTET_STREAM, EMPTY, GET} from "../../util/Constants";
import {isInvalidSession} from "../../util/UtilityFunctions";
import {ContentRenderHandler} from "../error/ContentRenderHandler";
import {SessionExpiredError} from "../error/SessionExpiredError";

export const PipelineResult = () => {
    const [files, setFiles] = useState();
    const [dataNotFound, setDataNotFound] = useState<string>(EMPTY);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
    const [serverErrorMsg, setServerErrorMsg] = useState<string>(EMPTY);
    const [pipelineId, setPipelineId] = useState<string>(EMPTY);
    const queryParams = new URLSearchParams(window.location.search);
    const loadSuccessfulResultURI = "/pipeline/success/result";
    const pipelineIdLabel = "pipelineId";
    const pipelineReport = PIPELINE_MANAGER_URI + "/pipeline/{pipelineId}/report";
    const dataNotFoundErrorMsg = "Data not found! There are no results available.";

    useEffect(() => {
        setIsLoading(true);
        const loadSuccessfulResult = async (loadSuccessfulResultURI: string) => {
            await fetchData(PIPELINE_MANAGER_URI + loadSuccessfulResultURI)
                .then(responseBody => {
                    const responseBodyAsJson = JSON.parse(responseBody);
                    if (responseBodyAsJson.files.length === 0) {
                        setDataNotFound(dataNotFoundErrorMsg);
                    } else {
                        setFiles(responseBodyAsJson.files
                            .map((filePath: string) => {
                                    const filename = filePath.substring(filePath.lastIndexOf("/") + 1);
                                    setPipelineId(responseBodyAsJson.pipelineId);
                                    return listFiles(responseBodyAsJson.pipelineId, filePath, filename);
                                }
                            ));
                        setDataNotFound(EMPTY);
                    }
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
        }

        if (queryParams.has(pipelineIdLabel)) {
            const successResultURIWithQueryParam = "?" + pipelineIdLabel + "=" + queryParams.get(pipelineIdLabel);
            loadSuccessfulResult(loadSuccessfulResultURI + successResultURIWithQueryParam).then();
        } else {
            loadSuccessfulResult(loadSuccessfulResultURI).then();
        }
    }, []);

    const listFiles = (pipelineId: string, filePath: string, filename: string) => {
        return (
            <button className="vf-button vf-button--primary vf-button--sm"
                    onClick={() => downloadFile(pipelineId, filePath, filename)}>
                {filename}
            </button>
        );
    }

    const downloadFile = async (pipelineId: string, filePath: string, filename: string) => {
        setIsLoading(true);
        await fetch(pipelineReport.replace('{pipelineId}', pipelineId) + "?path=" + filePath, {
            method: GET,
            headers: {
                "Content-Type": APPLICATION_OCTET_STREAM,
            },
        }).then(async response => {
            setIsSessionExpired(isInvalidSession(response));
            if (!response.ok) {
                throw new Error("Download failed");
            }
            return await response.blob();
        }).then(blob => {
            // Create a download link
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.setAttribute("download", filename); // Set the filename for the downloaded file
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();

            // Clean up the URL object
            //window.body.revokeObjectURL(downloadUrl);
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
        }).catch((error) => {
            console.error("Error:", error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const renderContent = (
        <div className="vf-content">
            <br/>
            <h1>Results for Pipeline {pipelineId}</h1>
            <br/>
            <p className="vf-content__standsecond">
                <ul className="vf-list vf-list--unordered | vf-list--tight">
                    {files}
                </ul>
            </p>
        </div>
    );
    return <ContentRenderHandler
        isLoading={isLoading}
        isSessionExpired={isSessionExpired}
        serverErrorMsg={serverErrorMsg}
        dataNotFound={dataNotFound}
        data={renderContent}/>;
}
