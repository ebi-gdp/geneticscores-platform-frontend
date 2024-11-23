import {EMPTY} from "../../../../util/Constants";
import React from "react";
import {ExistingRecordType} from "./ExistingDataset";

export const NewDataset = ({
                               previousStep, openDirOnGuestCollection,
                               downloadPublicKey, publicKeyDetails, validateFiles, errors
                           }: ExistingRecordType) => {
    return (
        <>
            <div className="vf-content">
                <br/>
                <button className="vf-link-button" type="button"
                        onClick={() => previousStep(1)}>Back
                </button>
                <h1>Transfer your data</h1>
                <p className="vf-text-body vf-text-body--3">We have created a private destination folder for
                    you to upload your data.
                    You can now upload your data securely by transferring it to our destination
                    folder.<a href="https://docs.intervenegeneticscores.org/category/upload"
                              target="_blank"
                              rel="noreferrer"
                              className="vf-link"> Read how to transfer data using Globus.</a>
                </p>
                <p className="vf-text-body vf-text-body--3">
                    We only accept data encrypted using the crypt4gh standard. Please download the public encryption key
                    specific to this data upload and follow the <a href="https://docs.intervenegeneticscores.org/tutorial-encrypt/cli/" target="_blank"
                       rel="noreferrer" className="vf-link">instructions</a> to encrypt your data
                </p>
                <p>
                    <button className="vf-button vf-button--secondary vf-button--sm"
                            onClick={() => downloadPublicKey(publicKeyDetails.datasetId + ".pub", publicKeyDetails.publicKey)}>Download the public encryption key for this data upload</button>
                </p>
                <p className="vf-text-body vf-text-body--3">After encrypting your data, use the button below to access
                    the Globus folder and upload your files. Please upload files only (not folders or directories), and
                    note that large files may take some time to transfer. Currently, we accept the following formats:
                    PLINK2 data (*.pgen.c4gh, *.psam.c4gh, .pvar.c4gh), PLINK data (.bed.c4gh, *.bim.c4gh, .fam.c4gh),
                    and VCF files (.vcf.gz.c4gh)</p>
                <p>
                    <button className="vf-button vf-button--secondary vf-button--sm"
                            onClick={() => openDirOnGuestCollection()}>View destination folder
                    </button>
                </p>
                <p className="vf-text-body vf-text-body--3">If you are using the Globus web browser you will see green
                    check marks next to all your files once the transfer is complete. If you are using Globus Personal
                    Connect you will receive a confirmation email once the transfer is completed. Please press the
                    button below when all your files have been transferred.</p>
                <button className="vf-button vf-button--primary vf-button--sm"
                        onClick={() => validateFiles()}>I have transferred my data
                </button>
            </div>
            <div className="red-text" id="genome-build-error">{errors !== EMPTY &&
                <span>{errors}</span>}</div>
        </>
    );
}
