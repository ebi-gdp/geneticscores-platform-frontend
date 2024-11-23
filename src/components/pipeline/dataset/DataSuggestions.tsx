import {CombinedStepAction} from "./DatasetInputParameters";

export const DataSuggestions = ({previousStep, nextStep}: CombinedStepAction) => {
    return (
        <div className="vf-content">
            <br/>
            <button className="vf-link-button" type="button" onClick={() => previousStep(1)}>Back</button>
            <h1>Data suggestions</h1>
            <p className="vf-content__standsecond"><h4>For best results we suggest that your data be:</h4></p>
            <ul className="vf-list vf-list--unordered">
                <li className="vf-list__item"><h5> Imputed: </h5></li>
                <p className="vf-text-body vf-text-body--3"> The success of the calculation pipeline is dependent on
                    the
                    variants in the scoring file being present in your target genomic data. Using imputed data,
                    which includes many more variants, will increase your chances of getting more accurate results.
                    <br/><br/>
                    <b>The scoring calculation will fail</b> if there is an insufficient overlap between the scoring
                    file and the target variants.</p>
                <li className="vf-list__item"><h5> Compressed: </h5></li>
                <p className="vf-text-body vf-text-body--3">Compressed files will upload and be processed faster. You
                    can use plink2 to compress your files.</p>
            </ul>
            <br/>
            <button className="vf-button vf-button--primary vf-button--sm" onClick={() => nextStep(1)}>Continue to
                uploading your data
            </button>
        </div>
    );
}
