export const PipelineSubmissionSuccessMsg = ({ pipelineId }: { pipelineId: string }) => {
    return (
        <b>
            Your pipeline request has been successfully submitted (Pipeline ID: {pipelineId}).<br />
            Check the Dashboard for status updates. You will receive an email when the job is complete.
        </b>
    );
};
