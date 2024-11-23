import React, {CSSProperties, useState} from "react";
import {useAuth} from "../../auth/UserProvider";
import {ProcessLoadingSpinner} from "../ProcessLoadingSpinner";
import {EMPTY} from "../../util/Constants";

const divHeight: CSSProperties = {
    height: "250px"
}

const paddingTop: CSSProperties = {
    paddingTop: "25px",
    textAlign: "center"
}

const divAlignCenter: CSSProperties = {
    textAlign: "center"
}

export const CreateAccount = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {isAuthenticated, createAccountError, createAccount, user} = useAuth();

    const triggerCreateAccount = async () => {
        setIsLoading(true);
        createAccount();
        setIsLoading(false);
    }

    if (isLoading) {
        return <ProcessLoadingSpinner/>;
    } else if (isAuthenticated && user === null) {
        return (
            <div className="vf-content" style={divHeight}>
                <div style={paddingTop}>
                    <h4>You have successfully authenticated, next we will make you a platform user account and you can continue to consent to our data processing terms</h4>
                    <p/>
                    <button className="vf-button vf-button--primary vf-button--sm"
                            onClick={() => triggerCreateAccount()}>
                        Continue
                    </button>
                </div>
                <div style={divAlignCenter} className="red-text"
                     id="sample-set-name-error">{createAccountError !== EMPTY &&
                    <span>{createAccountError}</span>}</div>
            </div>
        );
    }
    return <div/>;
}
