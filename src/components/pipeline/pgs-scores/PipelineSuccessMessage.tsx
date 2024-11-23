import React, {CSSProperties} from "react";

interface PipelineId {
    pipelineId: string
}

const FontWeight: CSSProperties = {
    fontWeight: "bold"
}

export const PipelineSuccessMessage = (pipelineId: PipelineId) => {
    return (
        <div style={FontWeight}>
            <>
                Your pipeline request has been successfully submitted (Pipeline ID: {pipelineId}).
                <br/>
                Check the Dashboard for status updates. You will receive an email when the job is complete.
            </>
        </div>
    );
}
