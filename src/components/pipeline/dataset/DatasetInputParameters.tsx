import {DataRequirements} from "./DataRequirements";
import {DataSuggestions} from "./DataSuggestions";
import {GenomeBuild} from "./GenomeBuild";
import {GlobusCollection} from "./GlobusCollection";
import {GlobusAccountIdentity} from "./globus/GlobusAccountIdentity";
import {AddPolygenicScoreIDs} from "../pgs-scores/AddPolygenicScoreIDs";
import React, {useState} from "react";
import {useGlobalEnv} from "../../context/GlobalEnvironment";
import {useAuth} from "../../../auth/UserProvider";
import {isSessionExpiredGlobal} from "../../../util/UtilityFunctions";
import {SelectPolygenicScoresByTrait} from "../pgs-scores/SelectPolygenicScoresByTrait";
import {SelectPolygenicScoresByPublication} from "../pgs-scores/SelectPolygenicScoresByPublication";
import {TransferYourData} from "./globus/TransferYourData";
import {SelectPolygenicScoresLandingPage} from "../pgs-scores/SelectPolygenicScoresLandingPage";
import {useNavigate} from "react-router-dom";
import {UNAUTHORISED} from "../../../util/URIConstants";

export interface NextStepAction {
    nextStep: (arg: number) => void
}

export interface PreviousStepAction {
    previousStep: (arg: number) => void
}

export interface CombinedStepAction extends NextStepAction, PreviousStepAction {
}

export const DatasetInputParameters = () => {
    const {isAuthenticated, lastAccessTime, maxIdleTime, updateLastAccessTime, resetUser} = useAuth();
    const {existingRecord} = useGlobalEnv();
    const [step, setStep] = useState<number>(existingRecord ? 6 : 1);
    const navigate = useNavigate();

    // go back to the previous step
    const previousStep = (noOfSteps: number) => {
        validateUserSession();
        updateLastAccessTime();
        setStep(step - noOfSteps);
    }

    // proceed to the next step
    const nextStep = (noOfSteps: number) => {
        validateUserSession();
        updateLastAccessTime();
        setStep(step + noOfSteps);
    }

    const validateUserSession = () => {
        if (!isAuthenticated || isSessionExpiredGlobal(lastAccessTime, maxIdleTime)) {
            resetUser();
            navigate(UNAUTHORISED);
        }
    }

    switch (step) {
        default:
        case 1:
            return <DataRequirements
                nextStep={nextStep}/>
        case 2:
            return <DataSuggestions
                previousStep={previousStep}
                nextStep={nextStep}/>
        case 3:
            return <GenomeBuild
                previousStep={previousStep}
                nextStep={nextStep}/>
        case 4:
            return <GlobusCollection
                previousStep={previousStep}
                nextStep={nextStep}/>
        case 5:
            return <GlobusAccountIdentity
                previousStep={previousStep}
                nextStep={nextStep}/>
        case 6:
            return <TransferYourData
                previousStep={previousStep}
                nextStep={nextStep}/>
        case 7:
            return <SelectPolygenicScoresLandingPage
                previousStep={previousStep}
                nextStep={nextStep}/>
        case 8:
            return <SelectPolygenicScoresByTrait
                previousStep={previousStep}/>
        case 9:
            return <SelectPolygenicScoresByPublication
                previousStep={previousStep}/>
        case 10:
            return <AddPolygenicScoreIDs
                previousStep={previousStep}/>
    }
}
