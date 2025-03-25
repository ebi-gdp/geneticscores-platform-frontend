import {NextStepAction} from "./DatasetInputParameters";

export const DataRequirements = ({nextStep}: NextStepAction) => {
    return (
        <>
            <div className="vf-content">
                <br/>
                <br/>
                <h1>Data requirements</h1>
                <p className="vf-content__standsecond">You will upload a set of genomes/genotyping data that you want to
                    calculate polygenic scores for. These genomes should be distinct from those used to develop the
                    polygenic scores originally (i.e., those used to derive the risk alleles and weights), as
                    overlapping samples will inflate common metrics of PGS accuracy.</p>
                <h2>Your data must</h2>
                <ul className="vf-list vf-list--unordered">
                    <li className="vf-list__item" key="li-1"><a href="https://docs.geneticscores.org/category/encrypt">Be encrypted using crypt4gh.</a> Your encryption key can be downloaded only after you create a Globus destination folder for your data.</li>
                    <li className="vf-list__item" key="li-2">Must be in PLINK1 or PLINK2 format.</li>
                    <li className="vf-list__item" key="li-3">Contain chromosomes 1 to 22, X and Y only.</li>
                    <li className="vf-list__item" key="li-4">Use human genome reference build GRCh38 or GRCh37 coordinates.</li>
                </ul>
                <br/>
                <button className="vf-button vf-button--primary vf-button--sm" onClick={() => nextStep(1)}>Continue
                </button>
            </div>
        </>
    );
}
