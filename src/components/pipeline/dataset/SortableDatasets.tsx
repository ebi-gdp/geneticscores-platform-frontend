import React, {CSSProperties, useState} from "react";
import {useNavigate} from "react-router-dom";

import SortableTable from "../SortableTable";
import {PGS_CALCULATOR, PIPELINE_MANAGER_URI} from "../../../util/URIConstants";
import {DatasetDetailsType} from "./DatasetModelUtil";
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {deleteRequest} from "../../../util/Fetch";
import Pagination from "../Pagination";
import {ProcessLoadingSpinner} from "../../ProcessLoadingSpinner";
import {SessionExpiredError} from "../../error/SessionExpiredError";
import {UnauthorisedNavigate} from "../../../auth/UnauthorisedNavigate";
import {EMPTY} from "../../../util/Constants";
import {ErrorMessage} from "../../error/ErrorMessage";

const RedText: CSSProperties = {
    color: "#820101"
}

export const SortableDatasets = ({data, pageCount, pageOffset, handlePageChange, setReload}: {
    data: DatasetDetailsType[],
    pageCount: number,
    pageOffset: number,
    handlePageChange: (event: any) => void,
    setReload: (arg: boolean) => void
}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
    const [serverErrorMsg, setServerErrorMsg] = useState<string>(EMPTY);

    const confirmDeleteDataset = (datasetId: string) => {
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure to do this",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deleteDataset(datasetId)
                },
                {
                    label: "No",
                    onClick: () => {
                    }
                }
            ]
        });
    }

    const deleteDataset = (datasetId: string) => {
        setIsLoading(true);
        deleteRequest(PIPELINE_MANAGER_URI + "/dataset/" + datasetId)
            .then(ignoreValue => {
                const jsonResponse = JSON.parse(ignoreValue);
                confirmAlert({
                    message: "Dataset " + jsonResponse.datasetId + " has been deleted!",
                    buttons: [{
                        label: "Ok",
                        onClick: () => setReload(true)
                    }]
                });
            })
            .catch(reason => {
                if (reason instanceof SessionExpiredError) {
                    setIsSessionExpired(true);
                } else {
                    setServerErrorMsg(reason.message);
                }
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const columns = [
        {key: "datasetId", label: "Id", sortable: true},
        {key: "datasetName", label: "Name", sortable: true},
        {key: "genomeBuild", label: "Genome build", sortable: true},
        {
            key: "expiresAt", label: "Expiration timestamp", sortable: true,
            render: (item: DatasetDetailsType) => (
                item.deleted ? "-" : item.expiresAt)
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            render: (item: DatasetDetailsType) => (
                item.deleted ? "Deleted" : (item.expired ? "Expired" : "Active"))
        },
        {
            key: "action",
            label: "Action",
            render: (item: DatasetDetailsType) => (
                <>
                    <button
                        className="vf-button vf-button--sm vf-button--icon"
                        onClick={() => {
                            if (item.datasetId) {
                                navigate(PGS_CALCULATOR + "/dataset/" + item.datasetId);
                            }
                        }}>
                        {item.expired || item.deleted ? "" : "Launch Job"}
                    </button>
                </>
            )
        },
        {
            key: EMPTY,
            label: EMPTY,
            render: (item: DatasetDetailsType) => (
                !item.deleted && !item.expired && <button
                    className="vf-button vf-button--sm vf-button--icon"
                    style={RedText}
                    onClick={() => confirmDeleteDataset(item.datasetId)}>Delete</button>
            )
        }
    ];

    if (isLoading) {
        return <ProcessLoadingSpinner/>;
    } else if (isSessionExpired) {
        return <UnauthorisedNavigate/>;
    } else if (serverErrorMsg !== EMPTY) {
        return <ErrorMessage errorMsg={serverErrorMsg}/>;
    } else {
        return (
            <>
                <SortableTable data={data} columns={columns} title="Sample sets"/>
                <br/>
                <div className="pagination">
                    <Pagination
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        pageOffset={pageOffset}
                    />
                </div>
                <div className="spacer"/>
            </>
        );
    }
};

