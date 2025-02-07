import {CSSProperties} from "react";

const redText: CSSProperties = {
    color: "red",
    fontWeight: "bold"
}

export const TooManyPipelineSubmissionMsg = () => {
    return (
        <>
        <span
            style={redText}>Pipeline submission: you have exhausted per day limit quota.</span> <b>Please try again
            tomorrow.</b>
            <br/><br/>
            For more information please refer to the documentation!
        </>
    );
};
