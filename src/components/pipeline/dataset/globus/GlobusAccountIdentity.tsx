import React, {useState} from "react";
import {FILE_HANDLER_URI, PIPELINE_MANAGER_URI} from "../../../../util/URIConstants";
import {useGlobalEnv} from "../../../context/GlobalEnvironment";
import {fetchData, postJsonData, postPlainData} from "../../../../util/Fetch";
import {CombinedStepAction} from "../DatasetInputParameters";
import {SessionExpiredError} from "../../../error/SessionExpiredError";
import ClientError from "../../../error/ClientError";
import {EMPTY} from "../../../../util/Constants";
import {useAuth} from "../../../../auth/UserProvider";
import {isSessionExpiredGlobal} from "../../../../util/UtilityFunctions";
import {ContentRenderHandler} from "../../../error/ContentRenderHandler";

export const GlobusAccountIdentity = ({previousStep, nextStep}: CombinedStepAction) => {
    const {lastAccessTime, maxIdleTime, updateLastAccessTime, resetUser} = useAuth();
    const {existingRecord, datasetDetails, updateUserInput, handleChangeUserInput} = useGlobalEnv();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string>(EMPTY);
    const [isDisabled] = useState<boolean>(existingRecord);
    const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
    const [serverErrorMsg, setServerErrorMsg] = useState<string>(EMPTY);
    const emailRegexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const globusUserURI = "/globus/user";
    const dirGuestCollectionURI = PIPELINE_MANAGER_URI + "/globus/dir-guest-collection";
    const datasetURI = PIPELINE_MANAGER_URI + "/dataset";

    const performGlobusSetup = () => {
        setIsLoading(true);

        if (isSessionExpiredGlobal(lastAccessTime, maxIdleTime)) {
            resetUser();
            setIsSessionExpired(true);
        }

        updateLastAccessTime();

        if (existingRecord) {
            setIsLoading(false);
            nextStep(1);
        } else if (!validateEmail(datasetDetails.globusDetails.username)) {
            setIsLoading(false);
            setErrors("Please enter valid email id!");
        } else {
            executeGlobusAccountIdentity().then();
        }
    }

    const validateEmail = (emailId: string) => {
        return emailRegexPattern.test(emailId);
    }

    const executeGlobusAccountIdentity = async () => {
        try {
            await validateGlobusIdentity().then();
            await mapGlobusUserIdentity().then();
            const filesetId = await createDirOnGuestCollection().then();
            await createOrUpdateDataset(filesetId);
            nextStep(1);
        } catch (reason: any) {
            if (reason instanceof SessionExpiredError) {
                setIsSessionExpired(true);
            } else if (reason instanceof ClientError) {
                setErrors(reason.message);
            } else {
                setServerErrorMsg(reason.message);
            }
            setIsLoading(false);
        }
    }

    const validateGlobusIdentity = async () => {
        const responseBody = await fetchData(FILE_HANDLER_URI + globusUserURI + "?username=" + datasetDetails.globusDetails.username);
        const responseData = JSON.parse(responseBody);
        const identity = responseData.identities[0];

        if (identity.validIdentity === true) {
            setErrors(EMPTY);
        } else {
            throw new ClientError({
                message: "Please link this identity (" + datasetDetails.globusDetails.username
                    + ") to your Globus account or use a different address which is linked to your Globus account"
            });
        }
    }

    const mapGlobusUserIdentity = async () => {
        const responseBody = await postPlainData(PIPELINE_MANAGER_URI + globusUserURI,
            datasetDetails.globusDetails.username);
        const responseData = JSON.parse(responseBody);
        updateUserInput("globusDetails.username", responseData.globusUserUID);
    }

    const createDirOnGuestCollection = async () => {
        const responseBody = await postJsonData(dirGuestCollectionURI, {
            globusUsername: datasetDetails.globusDetails.username,
            datasetName: datasetDetails.datasetName
        });
        const responseData = JSON.parse(responseBody);
        return responseData.filesetId;
    }

    const createOrUpdateDataset = async (filesetId: string) => {
        const responseBody = await postJsonData(datasetURI, {
            datasetId: datasetDetails.datasetId,
            datasetName: datasetDetails.datasetName,
            genomeBuild: datasetDetails.genomeBuild.toUpperCase(),
            filesetId: filesetId
        });
        const responseData = JSON.parse(responseBody);
        updateUserInput("datasetId", responseData.datasetId);
    }

    const renderContent = (
        <div className="vf-content">
            <br/>
            <button className="vf-link-button" type="button"
                    onClick={() => previousStep(1)}>Back
            </button>
            <h1>Your Globus Account Identity</h1>
            <p className="vf-content__standsecond">
                <p className="vf-text-body vf-text-body--3">Your Globus account identity is the <b>email address</b> you used to log in to Globus. We will use your Globus account identity to create a private
                    destination folder on our system. You can then transfer your data to us.
                </p>
            </p>
            <br/>
            <div className="vf-grid">
                <form className="vf-stack vf-stack--400">
                    <div className="vf-grid vf-grid__col-2">
                        <div className="vf-form__item vf-stack">
                            <label htmlFor="globusDetails.username"
                                   className="text-heading">Your Globus account
                                identity</label>
                            <input type="text"
                                   name="username"
                                   id="username"
                                   className="vf-form__input"
                                   placeholder="example@ebi.ac.uk"
                                   value={datasetDetails.globusDetails.username}
                                   onChange={handleChangeUserInput}
                                   disabled={isDisabled}/>
                        </div>
                    </div>
                    <div className="red-text"
                         id="genome-build-error">{errors !== EMPTY &&
                        <span>{errors}</span>}</div>
                </form>
            </div>
            <br/>
            <button className="vf-button vf-button--primary vf-button--sm"
                    onClick={() => performGlobusSetup()}>{isDisabled ? "Continue" : "Create destination folder"}
            </button>
        </div>
    );
    return <ContentRenderHandler
        isLoading={isLoading}
        isSessionExpired={isSessionExpired}
        serverErrorMsg={serverErrorMsg}
        data={renderContent}/>;
}
