import {useGlobalEnv} from "../../context/GlobalEnvironment";
import React, {CSSProperties, useCallback, useState} from "react";
import {EMPTY} from "../../../util/Constants";
import {PIPELINE_MANAGER_URI} from "../../../util/URIConstants";
import {fetchData, postJsonData, postPlainData} from "../../../util/Fetch";
import {SessionExpiredError} from "../../error/SessionExpiredError";
import {DataNotFoundError} from "../../error/DataNotFoundError";
import {ScoreResultList} from "./ScoreResultList";
import {SelectedScores} from "./SelectedScores";
import {SearchTermButton} from "./SearchTermButton";
import {redText, ScoreType, TRAIT_SEARCH, ulStyleBuilder} from "./SelectPolygenicScoresByTrait";
import {PreviousStepAction} from "../dataset/DatasetInputParameters";
import {PublicationType} from "./SelectPolygenicScoresByPublication";
import {useAuth} from "../../../auth/UserProvider";
import {isSessionExpiredGlobal} from "../../../util/UtilityFunctions";
import {ContentRenderHandler} from "../../error/ContentRenderHandler";

interface CommonSearchType extends PreviousStepAction {
    searchType: string,
    pgsIdsCatalogURL: string,
    pipelineExecutionURL: string,
    pgsIdsScoreURL: string,
    defaultTerm: DefaultTerm
}

export interface DefaultTerm {
    defaultTermOne: string,
    defaultTermTwo: string
}

export const PGSGenericSearch = ({
                                     searchType,
                                     previousStep,
                                     pgsIdsCatalogURL,
                                     pipelineExecutionURL,
                                     pgsIdsScoreURL,
                                     defaultTerm
                                 }: CommonSearchType) => {
    const {lastAccessTime, maxIdleTime, updateLastAccessTime, resetUser} = useAuth();
    const {datasetDetails} = useGlobalEnv();
    const [searchTerm, setSearchTerm] = useState<string>(EMPTY);
    const [scores, setScores] = useState<ScoreType[] | null>(null);
    const [ulStyle, setUlStyle] = useState<CSSProperties>({});
    const [pipelineId, setPipelineId] = useState<string>(EMPTY);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string>(EMPTY);
    const [disableTriggerButton, setDisableTriggerButton] = useState<boolean>(false);
    const [selectedScore, setSelectedScore] = useState<ScoreType | null>(null);
    const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
    const [serverErrorMsg, setServerErrorMsg] = useState<string>(EMPTY);
    const [searchMessage, setSearchMessage] = useState<React.JSX.Element | null>(null);
    const pipelineURI = PIPELINE_MANAGER_URI + "/pipeline";

    const searchScores = useCallback((searchTerm: string) => {
        setScores(null);
        setErrors(EMPTY);
        setDisableTriggerButton(false);
        setSearchMessage(<>Searching {searchType}(s)...</>);

        if (searchTerm.length === 0) {
            setSearchMessage(<span style={redText}>Search term is empty!</span>);
        } else {
            fetchData(
                pgsIdsCatalogURL + "?searchTerm=" + searchTerm)
                .then(responseText => {
                    const responseData = JSON.parse(responseText);
                    let responseDataSize = 0;

                    if (searchType === TRAIT_SEARCH) {
                        setScores(responseData.results);
                        responseDataSize = responseData.results.length;
                    } else if (searchType === "Publication") {
                        setScores(responseData.map((score: PublicationType) => {
                                return buildPublicationRecord(score.pubId, score.key, score.pubIdsCount);
                            }
                        ));
                        responseDataSize = responseData.length;
                    }

                    if (responseDataSize <= 3) {
                        setUlStyle(ulStyleBuilder(50 * responseDataSize));
                    } else {
                        setUlStyle(ulStyleBuilder(200));
                    }
                    setSearchMessage(null);
                }).catch((reason) => {
                setScores(null);
                if (reason instanceof SessionExpiredError) {
                    setIsSessionExpired(true);
                } else if (reason instanceof DataNotFoundError) {
                    setUlStyle(ulStyleBuilder(50));
                    setSearchMessage(<span style={redText}>{searchType}(s) not found!</span>);
                } else {
                    setServerErrorMsg(reason.message);
                }
            }).finally(() => {
                updateLastAccessTime();
            });
        }
    }, [pgsIdsCatalogURL, searchType]);

    const buildPublicationRecord = (id: string, label: string, pgsIdsSize: number) => {
        return {
            "id": id,
            "label": label,
            "pgsIdsSize": pgsIdsSize
        }
    }

    const selectScore = ({id, label, pgsIdsSize}: ScoreType) => {
        setScores(null);
        setSelectedScore(buildPublicationRecord(id, label, pgsIdsSize));
        setErrors(EMPTY);
    }

    const validatePipelineParameters = async () => {
        if (isSessionExpiredGlobal(lastAccessTime, maxIdleTime)) {
            resetUser();
            setIsSessionExpired(true);
        } else {
            setIsLoading(true);
            if (selectedScore === null) {
                setErrors(searchType + " not selected! search for " + searchType + "s");
                setIsLoading(false);
            } else {
                executePolygenicScoringPipeline().then();
            }
        }
    }

    const executePolygenicScoringPipeline = async () => {
        createPipeline()
            .then(pipelineId => {
                executePipeline(pipelineId);
            }).catch(reason => {
            handlerError(reason);
        });
    }

    const createPipeline = async () => {
        const responseBody = await postPlainData(pipelineURI,
            datasetDetails.datasetId);
        const pipelineId = JSON.parse(responseBody).pipelineId;
        setPipelineId(pipelineId);
        return pipelineId;
    }

    const executePipeline = (pipelineId: string) => {
        postJsonData(pipelineExecutionURL.replace('{pipelineId}', pipelineId), {
            scoreIds: [selectedScore?.id]
        }).then(() => {
            setErrors(EMPTY);
            setDisableTriggerButton(true);
        }).catch(reason => {
            handlerError(reason);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const setDefaultSearchTerm = (searchTerm: string) => {
        searchScores(searchTerm);
    }

    const handleInputBoxTextChange = (value: string) => {
        if (value === EMPTY) {
            setScores(null);
            setSearchMessage(null);
        }
        setSearchTerm(value)
    }

    const handlerError = (reason: any) => {
        if (reason instanceof SessionExpiredError) {
            setIsSessionExpired(true);
        } else {
            setServerErrorMsg(reason.message);
        }
        setIsLoading(false);
    }

    const renderContent = (
        <div className="vf-content">
            <br/>
            <button className="vf-link-button" type="button"
                    onClick={() => previousStep(searchType === TRAIT_SEARCH ? 1 : 2)}>Back
            </button>
            <h1>Select your polygenic scores by {searchType}(s)</h1>
            <p className="vf-text-body vf-text-body--3">Search for a {searchType} to view its polygenic scores
                from
                the PGS
                Catalog:</p>
            <div className="vf-grid vf-grid__col-2">
                <form action="#"
                      className="vf-form vf-form--search vf-form--search--mini | vf-sidebar vf-sidebar--end">
                    <div className="vf-sidebar__inner">
                        <div className="vf-form__item">
                            <label className="vf-form__label vf-u-sr-only | vf-search__label"
                                   htmlFor="searchitem">Search</label>
                            <input type="search"
                                   placeholder={"Enter your search " + searchType}
                                   id="searchitem"
                                   className="vf-form__input"
                                   aria-owns="vf-form--search__results-list"
                                   onChange={(event) => {
                                       handleInputBoxTextChange(event.target.value)
                                   }}
                                   value={searchTerm}/>
                            {scores != null && (
                                <ScoreResultList ulStyle={ulStyle} scores={scores} selectScore={selectScore}/>)}
                            {scores == null && searchMessage !== null && searchMessage}
                            <br/>
                            <br/>
                            Examples: <button className="vf-link-button" type="button" onClick={() => {
                            setSearchTerm(defaultTerm.defaultTermOne);
                            setDefaultSearchTerm(defaultTerm.defaultTermOne);
                        }}>{defaultTerm.defaultTermOne}</button>, <button className="vf-link-button"
                                                                          type="button"
                                                                          onClick={() => {
                                                                              setSearchTerm(defaultTerm.defaultTermTwo);
                                                                              setDefaultSearchTerm(defaultTerm.defaultTermTwo);
                                                                          }}>{defaultTerm.defaultTermTwo}</button>
                            {selectedScore !== null && (<SelectedScores
                                title={"Your selected " + searchType + ":"}
                                scoreType={searchType}
                                label={selectedScore.label}
                                pgsUrl={pgsIdsScoreURL + selectedScore.id}
                                pgsIdsSize={selectedScore.pgsIdsSize}/>)}
                        </div>
                        <SearchTermButton searchFunction={searchScores} searchTerm={searchTerm}/>
                    </div>
                </form>
            </div>
            <br/>
            {errors !== EMPTY && <div className="vl-red-text" id="error">{errors}</div>}
            {disableTriggerButton ? (<b>Your pipeline request has been successfully submitted (Pipeline ID: {pipelineId}).<br/>
                Check the Dashboard for status updates. You will receive an email when the job is complete.</b>) : (
                <button className="vf-button vf-button--primary vf-button--sm"
                        onClick={() => validatePipelineParameters()}>Trigger Pipeline</button>
            )}
        </div>
    );
    return <ContentRenderHandler
        isLoading={isLoading}
        isSessionExpired={isSessionExpired}
        serverErrorMsg={serverErrorMsg}
        data={renderContent}/>;
}
