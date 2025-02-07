import React, {useEffect, useRef, useState} from "react";
import "../../../css/button.css";
import "../../../css/general.css";
import {PreviousStepAction} from "../dataset/DatasetInputParameters";
import {EMPTY} from "../../../util/Constants";
import {useGlobalEnv} from "../../context/GlobalEnvironment";
import {PIPELINE_MANAGER_URI} from "../../../util/URIConstants";
import {SessionExpiredError} from "../../error/SessionExpiredError";
import {BadRequestError} from "../../error/BadRequestError";
import {postJsonData, postPlainData} from "../../../util/Fetch";
import {useAuth} from "../../../auth/UserProvider";
import {isSessionExpiredGlobal} from "../../../util/UtilityFunctions";
import {ContentRenderHandler} from "../../error/ContentRenderHandler";
import {TooManyRequestError} from "../../error/TooManyRequestError";
import {PipelineSubmissionSuccessMsg} from "./messages/PipelineSubmissionSuccessMsg";
import {TooManyPipelineSubmissionMsg} from "./messages/TooManyPipelineSubmissionMsg";

export const AddPolygenicScoreIDs = ({previousStep}: PreviousStepAction) => {
    const {lastAccessTime, maxIdleTime, updateLastAccessTime} = useAuth();
    const {datasetDetails, polygenicScoreIds, setPolygenicScoreIds} = useGlobalEnv();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [disableTriggerButton, setDisableTriggerButton] = useState<boolean>(false);
    const [errors, setErrors] = useState<string>(EMPTY);
    const [pipelineId, setPipelineId] = useState<string>(EMPTY);
    const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
    const [serverErrorMsg, setServerErrorMsg] = useState<string>(EMPTY);
    const [pgsIds, setPgsIds] = useState<string>(polygenicScoreIds.replace(/\n/g, "<br>"));
    const [tooManyRequests, setTooManyRequests] = useState<boolean>(false);
    const invalidPGSIdError = "The PGS IDs (marked in red) are not in the PGS Catalog. Remove these PGS IDs from the input field below.";
    const divRef = useRef<HTMLDivElement>(null);
    const pipelineURI = PIPELINE_MANAGER_URI + "/pipeline";
    const pgsIdsValidateURI = `${pipelineURI}/pgs-ids/validate`;
    const pipelineExecutionPgsIdsURI = `${pipelineURI}/{pipelineId}/execute/pgs-ids`;

    useEffect(() => {
        setPgsIds(pgsIds.replace(/\n/g, "<br>"));
        setIsLoading(false);
    }, []);

    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleInputChange();
        }
    }

    const handlePaste = (event: any) => {
        event.preventDefault();
        placeCaretAtEnd(divRef.current);
        const copiedData = event.clipboardData.getData("text/plain");
        if (copiedData.length > 0) {
            if (divRef.current) {
                if (divRef.current.innerHTML.trim().replace(/(<br>)+$/, '') !== EMPTY) {
                    divRef.current.innerHTML = divRef.current.innerHTML
                            .replace(/^(<br>)+/, "")
                            .replace(/(<br>)+/g, "<br>")
                            .replace(/(<br>)+$/, '')
                        + "<br>" + copiedData.replace(/\s+/g, "<br>").replace(/^(<br>)+/, '');
                } else {
                    divRef.current.innerHTML = copiedData.replace(/\s+/g, "<br>");
                }
                placeHolder(divRef.current.innerHTML.replace(/<br\s*\/?>/gi, "\n"));
            }
        }
        placeCaretAtEnd(divRef.current);
    }

    const handleInputChange = () => {
        if (divRef.current) {
            const formattedText = divRef.current.innerHTML.replace(/(<br>)+/g, "<br>");
            if (formattedText.endsWith("<br>")) {
                divRef.current.innerHTML = divRef.current.innerHTML + "<br>";
            } else {
                divRef.current.innerHTML = divRef.current.innerHTML + "<br><br>";
            }
            placeCaretAtEnd(divRef.current);
        }
    }

    const placeCaretAtEnd = (el: any) => {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
        el.focus();
    };

    const validatePipelineParameters = () => {
        if (isSessionExpiredGlobal(lastAccessTime, maxIdleTime)) {
            setIsSessionExpired(true);
        } else {
            updateLastAccessTime();
            if (disableTriggerButton) {
                return;
            }
            setIsLoading(true);

            if (polygenicScoreIds.trim().length === 0) {
                setErrors("PGS ID(s) are empty!");
                setIsLoading(false);
            } else {
                const polygenicScoreIdsArray = polygenicScoreIds
                    .split("\n")
                    .filter(pgsIds => pgsIds.trim().length !== 0)
                    .map((pgsIds) => {
                        return pgsIds.trim();
                    })

                if (polygenicScoreIdsArray.length > 100) {
                    setErrors("Number of PGS IDs should be less than or equal to 100!");
                    setIsLoading(false);
                } else {
                    executePolygenicScoringPipeline(polygenicScoreIdsArray).then();
                }
            }
        }
    }

    const executePolygenicScoringPipeline = async (polygenicScoreIdsArray: string[]) => {
        try {
            await validatePGSIdsWithBackend(polygenicScoreIdsArray);
            const pipelineId = await createPipeline();
            await executePipeline(pipelineId, polygenicScoreIdsArray);
            setPipelineId(pipelineId);
            setTooManyRequests(false);
            setIsLoading(false);
        } catch (error: any) {
            if (error instanceof SessionExpiredError) {
                setIsSessionExpired(true);
            } else if (error instanceof BadRequestError) {
                buildPGSIdsErrorMsg(error.responseData);
            } else if (error instanceof TooManyRequestError) {
                setTooManyRequests(true);
                setDisableTriggerButton(true);
            } else {
                setServerErrorMsg(error.message);
            }
            setIsLoading(false);
        }
    }

    const validatePGSIdsWithBackend = async (polygenicScoreIdsArray: string[]) => {
        await postJsonData(pgsIdsValidateURI, {
            scoreIds: polygenicScoreIdsArray
        });
        setErrors(EMPTY);
        setPgsIds(polygenicScoreIdsArray.join("<br>"));
    }

    const createPipeline = async () => {
        const responseBody = await postPlainData(pipelineURI,
            datasetDetails.datasetId);
        return await JSON.parse(responseBody).pipelineId;
    }

    const executePipeline = async (pipelineId: string, polygenicScoreIdsArray: string[]) => {
        await postJsonData(pipelineExecutionPgsIdsURI.replace('{pipelineId}', pipelineId), {
                scoreIds: polygenicScoreIdsArray
            }
        );
        setErrors(EMPTY);
        setDisableTriggerButton(true);
    }

    const buildPGSIdsErrorMsg = (pgsIDsMap: any) => {
        let pgsIdsString = EMPTY;
        Object
            .keys(pgsIDsMap)
            .forEach((key, value) => {
                if (value !== 0) {
                    pgsIdsString += "<br>";
                }

                if (pgsIDsMap[key] === false) {
                    pgsIdsString = pgsIdsString + "<span style=\"color: red\">" + key + "</span>";
                } else {
                    pgsIdsString = pgsIdsString + key;
                }
            })
        setErrors(invalidPGSIdError);
        placeHolder(pgsIdsString);
        setPgsIds(pgsIdsString);
    }

    const placeHolder = (arg: string) => {
        if (divRef.current) {
            if (arg === '') {
                divRef.current.classList.remove('has-content');
            } else {
                divRef.current.classList.add('has-content');
            }
        }
        setPolygenicScoreIds(arg);
    }

    const formatNewLineOccurrences = (text: string) => {
        return text.replace(/\n+/g, "\n").trim();
    }

    const renderContent = (
        <div className="vf-content">
            <br/>
            <button className="vf-link-button" type="button" onClick={() => previousStep(3)}>Back</button>
            <h1>Add your polygenic score IDs</h1>
            <p className="vf-content__standsecond">Add your polygenic score IDs (PGS IDs) from the <a
                href="https://www.pgscatalog.org/browse/scores/"
                className="vf-link"
                target="_blank"
                rel="noopener noreferrer">PGS Catalog</a> to your list of PGS scores:</p>
            <ul className="vf-list vf-list--unordered">
                <li className="vf-list__item">You can add up to 50 PGS IDs.</li>
                <li className="vf-list__item">Each PGS ID should be on a separate line. Duplicate ID(s) will be
                    removed.
                </li>
            </ul>
            {errors !== EMPTY && <div className="vl-red-text" id="genome-build-error">{errors}</div>}
            <p className="vf-content__standsecond">
                <div className="vf-grid">
                    <form className="vf-stack vf-stack--400">
                        <div className="vf-grid vf-grid__col-2">
                            <div className="vf-form__item vf-stack">
                                <label htmlFor="polygenicScoreIds" className="vf-form__label"> Your PGS IDs:</label>
                                <div
                                    ref={divRef}
                                    contentEditable="true"
                                    className={`custom-textarea ${pgsIds ? "has-content" : ""} vf-form__textarea`}
                                    onInput={() => placeHolder(formatNewLineOccurrences(divRef.current ? divRef.current.innerText : ''))}
                                    onKeyDown={handleKeyPress}
                                    onPaste={handlePaste}
                                    dangerouslySetInnerHTML={{__html: pgsIds}}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </p>
            <div>
                {disableTriggerButton ? (
                    tooManyRequests ? <TooManyPipelineSubmissionMsg/> :
                        <PipelineSubmissionSuccessMsg pipelineId={pipelineId}/>) : (
                    <button className="vf-button vf-button--primary vf-button--sm"
                            onClick={() => validatePipelineParameters()}>Trigger Pipeline</button>
                )}
            </div>
        </div>
    );
    return <ContentRenderHandler
        isLoading={isLoading}
        isSessionExpired={isSessionExpired}
        serverErrorMsg={serverErrorMsg}
        data={renderContent}/>;
}
