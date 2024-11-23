import React from 'react';
import {useNavigate} from "react-router-dom";
import SortableTable from "./SortableTable";
import {PipelineDetailsType} from "./PipelineModelUtil";
import {PGS_CALCULATOR} from "../../util/URIConstants";
import {formatTimestamp} from "../../util/UtilityFunctions";

export const SortablePipelines = ({data}: { data: PipelineDetailsType[] }) => {
    const navigate = useNavigate();

    const columns = [
        {key: 'pipelineId', label: 'Id', sortable: true},
        {key: 'pipelineStatus', label: 'Status', sortable: true},
        {
            key: 'datasetDetails.datasetName',
            label: 'Sample set',
            sortable: true,
            render: (item: PipelineDetailsType) => item.datasetDetails?.datasetName
        },
        {
            key: 'submittedOn', label: 'Submitted on', sortable: true,
            render: (item: PipelineDetailsType) => formatTimestamp(item.submittedOn)
        },
        {
            key: 'startedOn', label: 'Started on', sortable: true,
            render: (item: PipelineDetailsType) => formatTimestamp(item.startedOn)
        },
        {
            key: 'endedOn', label: 'Ended on', sortable: true,
            render: (item: PipelineDetailsType) => formatTimestamp(item.endedOn)
        },
        {
            key: 'action',
            label: 'Action',
            render: (item: PipelineDetailsType) => (
                <button
                    className="vf-button vf-button--sm vf-button--icon"
                    onClick={() => navigate(PGS_CALCULATOR + "/pipeline/" + item.pipelineId)}>
                    View
                </button>
            )
        }
    ];
    return <SortableTable data={data} columns={columns} title="Pipelines"/>;
};
