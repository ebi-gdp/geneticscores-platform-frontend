import {UNAUTHORISED} from "../util/URIConstants";
import {Navigate} from "react-router-dom";
import React from "react";
import {useAuth} from "./UserProvider";

export const UnauthorisedNavigate = () => {
    const {resetUser} = useAuth();
    resetUser();
    return <Navigate to={UNAUTHORISED}/>;
}
