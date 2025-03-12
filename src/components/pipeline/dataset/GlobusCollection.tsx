import {CombinedStepAction} from "./DatasetInputParameters";
import {DOCS_URL} from "../../../util/URIConstants";

export const GlobusCollection = ({previousStep, nextStep}: CombinedStepAction) => {
    return (
        <div className="vf-content">
            <br/>
            <button className="vf-link-button" type="button" onClick={() => previousStep(1)}>Back</button>
            <h1>Globus data transfer</h1>
            <p className="vf-content__standsecond">
                <h4>We use Globus to securely transfer data.</h4></p>
            <p className="vf-text-body vf-text-body--3">You need to create a <a href="https://www.globus.org"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="vf-link">Globus</a> account to upload your data.
                Keep track of the Globus account identity (email address) you use to create your account.</p>
            <p className="vf-text-body vf-text-body--3">You can upload data &lt; 15 GB via <a href="https://app.globus.org/file-manager"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="vf-link">a Globus web browser.</a></p>
            <p className="vf-text-body vf-text-body--3">If you want to transfer data &gt; 15 GB from your computer
                you will need to install <a href={DOCS_URL}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="vf-link">Globus Connect Personal.</a></p>
            <br/>
            <button className="vf-button vf-button--primary vf-button--sm" onClick={() => nextStep(1)}>Continue
            </button>
        </div>
    );
}
