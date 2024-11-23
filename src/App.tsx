import React from "react";
import {UserProvider} from "./auth/UserProvider";
import {SecuredComponent} from "./components/SecuredComponent";
import {GlobalEnvironment} from "./components/context/GlobalEnvironment";

export const App = () => {
    return (
        <>
            <UserProvider>
                <GlobalEnvironment>
                    <SecuredComponent/>
                </GlobalEnvironment>
            </UserProvider>
        </>
    );
}
