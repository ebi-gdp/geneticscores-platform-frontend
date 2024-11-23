import React, {useEffect, useState} from "react";
import {useGlobalEnv} from "../../../context/GlobalEnvironment";
import {GLOBUS_FILE_MANAGER_URI, PIPELINE_MANAGER_URI} from "../../../../util/URIConstants";
import {fetchData} from "../../../../util/Fetch";
import {SessionExpiredError} from "../../../error/SessionExpiredError";
import {BadRequestError} from "../../../error/BadRequestError";
import {DataNotFoundError} from "../../../error/DataNotFoundError";
import {CombinedStepAction} from "../DatasetInputParameters";
import {DatasetDetailsType} from "../DatasetModelUtil";
import {EMPTY} from "../../../../util/Constants";
import {DatasetNotActive} from "./DatasetNotActive";
import {ExistingDataset} from "./ExistingDataset";
import {NewDataset} from "./NewDataset";
import {useAuth} from "../../../../auth/UserProvider";
import {ContentRenderHandler} from "../../../error/ContentRenderHandler";

export const TransferYourData = ({previousStep, nextStep}: CombinedStepAction) => {
    const {updateLastAccessTime} = useAuth();
    const {existingRecord, datasetDetails, setDatasetDetails} = useGlobalEnv();
    const [errors, setErrors] = useState<string>(EMPTY);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [dirPathOnGuestCollectionURL, setDirPathOnGuestCollectionURL] = useState<string>(EMPTY);
    const [fullDirPath, setFullDirPath] = useState<string>(EMPTY);
    const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
    const [serverErrorMsg, setServerErrorMsg] = useState<string>(EMPTY);
    const [datasetDeleted, setDatasetDeleted] = useState<boolean>(false);
    const [datasetExpired, setDatasetExpired] = useState<boolean>(false);
    const datasetURI = PIPELINE_MANAGER_URI + "/dataset/{datasetId}";
    const validateFilesURI = PIPELINE_MANAGER_URI + "/globus/files/validate";

    useEffect(() => {
        setIsLoading(true);
        const fetchDatasetDetails = async () => {
            await fetchData(
                datasetURI.replace('{datasetId}', datasetDetails.datasetId))
                .then(responseBody => {
                    const datasetDetailsAsResponse = JSON.parse(responseBody);
                    setDatasetDetails(datasetDetailsAsResponse);
                    buildDirPath(datasetDetailsAsResponse);
                    setIsLoading(false);
                    setDatasetDeleted(datasetDetailsAsResponse.deleted);
                    setDatasetExpired(datasetDetailsAsResponse.expired);
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
                    updateLastAccessTime();
                })
        }

        if (existingRecord) {
            buildDirPath(datasetDetails);
            setDatasetDeleted(datasetDetails.deleted);
            setDatasetExpired(datasetDetails.expired);
            setIsLoading(false);
        } else {
            fetchDatasetDetails().then();
        }
    }, []);

    const openDirOnGuestCollection = () => {
        window.open(dirPathOnGuestCollectionURL, "_blank", "noopener, noreferrer");
    }

    const buildDirPath = (datasetDetails: DatasetDetailsType) => {
        const fullDirPath = datasetDetails.globusDetails.username + datasetDetails.globusDetails.dirPathOnGuestCollection;
        setFullDirPath(fullDirPath);
        setDirPathOnGuestCollectionURL(GLOBUS_FILE_MANAGER_URI + "?origin_id=" + datasetDetails.globusDetails.guestCollectionId + "&origin_path=" + fullDirPath);
    }

    const validateFiles = async () => {
        setIsLoading(true);
        await fetchData(validateFilesURI + "?path=" + fullDirPath)
            .then(() => {
                setErrors(EMPTY);
                nextStep(1);
            }).catch(reason => {
                if (reason instanceof SessionExpiredError) {
                    setIsSessionExpired(true);
                } else if (reason instanceof BadRequestError) {
                    setErrors("We have detected an error with data you have uploaded. Please ensure that you transfer only supported file types in the format described");
                } else if (reason instanceof DataNotFoundError) {
                    setErrors("No files have been uploaded to Globus!");
                } else {
                    setServerErrorMsg(reason.message);
                }
                setIsLoading(false);
            });
    }

    const downloadPublicKey = (filename: string, content: any) => {
        // Create a blob with the content
        const blob = new Blob([content]/*, { type: 'text/plain' }*/);

        // Create a link element
        const link = document.createElement('a');

        // Set the download attribute with a filename
        link.download = filename;

        // Create a URL for the blob and set it as the href attribute
        link.href = window.URL.createObjectURL(blob);

        // Append the link to the body (this is necessary for some browsers)
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    }

    const publicKeyDetails = (datasetId: string, publicKey: any) => {
        return {
            "datasetId": datasetId,
            "publicKey": publicKey
        }
    }

    const renderContent = (
        (datasetDeleted || datasetExpired) ? <DatasetNotActive
                previousStep={previousStep}
                datasetName={datasetDetails.datasetName}
                deleted={datasetDeleted}
                expired={datasetExpired}/>
            : existingRecord ?
                <ExistingDataset previousStep={previousStep} datasetName={datasetDetails.datasetName}
                                 openDirOnGuestCollection={openDirOnGuestCollection}
                                 publicKeyDetails={publicKeyDetails(datasetDetails.datasetId, datasetDetails.publicKey)}
                                 downloadPublicKey={downloadPublicKey} validateFiles={validateFiles}
                                 errors={errors}/> :
                <NewDataset previousStep={previousStep} datasetName=""
                            openDirOnGuestCollection={openDirOnGuestCollection}
                            publicKeyDetails={publicKeyDetails(datasetDetails.datasetId, datasetDetails.publicKey)}
                            downloadPublicKey={downloadPublicKey} validateFiles={validateFiles} errors={errors}/>);
    return <ContentRenderHandler
        isLoading={isLoading}
        isSessionExpired={isSessionExpired}
        serverErrorMsg={serverErrorMsg}
        data={renderContent}/>;
}
