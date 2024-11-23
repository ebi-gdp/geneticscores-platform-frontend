import React, {useCallback, useContext, useEffect, useState} from "react";
import {UserContext, UserDetails} from "./UserContext";
import {createAccountAPI, fetchUserDetailsAPI} from "../apis/fetchUserDetailsAPI";
import {BFF_LOGOUT} from "../util/URIConstants";
import {EMPTY, POST} from "../util/Constants";
import {homePageRedirect, landingPageRedirect} from "../util/UtilityFunctions";
import {fetchData} from "../util/Fetch";

const UserProvider = (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>(EMPTY);
    const [createAccountError, setCreateAccountError] = useState<string>(EMPTY);
    const [consentEvent, setConsentEvent] = useState<string>();
    const [lastAccessTime, setLastAccessTime] = useState<string>();
    const [maxIdleTime, setMaxIdleTime] = useState<string>();
    const errorMessage = "Error occurred while processing request!";
    const oauthURL = process.env.REACT_APP_OAUTH_URI || EMPTY;

    useEffect(() => {
        setError(EMPTY);
        setUser(null);
        setIsLoading(true);

        fetchUserDetailsAPI()
            .then(async response => {
                if (response.status === 200) {
                   await fetchData("/bff/session")
                        .then(responseBody => {
                            const responseBodyAsJson = JSON.parse(responseBody);
                            setLastAccessTime(responseBodyAsJson.lastAccessTime);
                            setMaxIdleTime(responseBodyAsJson.maxIdleTime);
                        });
                    setUser(response.userDetails);
                    setConsentEvent(response.userDetails?.consentType);
                    setIsAuthenticated(true);
                } else if (response.status === 401 || response.status === 403) {
                    setIsAuthenticated(false);
                    setError("User is not logged in!");
                } else if (response.status === 404) {
                    setIsAuthenticated(true);
                } else {
                    setError(errorMessage);
                }
            })
            .catch(() => {
                setError(errorMessage);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const createAccount = useCallback(async () => {
        setIsLoading(true);
        await createAccountAPI()
            .then((response) => {
                if (response.status === 201) {
                    setUser(response.userDetails);
                    setConsentEvent(response.userDetails?.consentType);
                } else if (response.status === 401 || response.status === 403) {
                    setError("User is not logged in!");
                    setIsAuthenticated(false);
                } else if (response.status === 404) {
                    setIsAuthenticated(true);
                } else {
                    setError(errorMessage);
                    setIsAuthenticated(false);
                }
            }).catch(reason => {
                setCreateAccountError(reason);
            }).finally(() => {
                setIsLoading(false);
            });
    }, []);

    const login = useCallback(() => {
        window.location.assign(oauthURL);
    }, [oauthURL])

    const logout = useCallback(() => {
        setIsLoading(true);
        fetch(BFF_LOGOUT, {
            method: POST
        }).then(response => {
            if (response.redirected) {
                landingPageRedirect();
            } else {
                homePageRedirect();
            }
        });
    }, []);

    const updateLastAccessTime = () => {
        const newLastAccessTime = new Date().toISOString();
        setLastAccessTime(newLastAccessTime);
    }

    const resetUser = () => {
        setUser(null);
        setIsAuthenticated(false);
    }

    const contextValue = {
        createAccount,
        createAccountError,
        isAuthenticated,
        login,
        logout,
        isLoading,
        user,
        consentEvent,
        setConsentEvent,
        lastAccessTime,
        updateLastAccessTime,
        maxIdleTime,
        resetUser,
        error
    };
    return <UserContext.Provider value={contextValue} {...props}/>
}

const useAuth = () => useContext(UserContext);
export {UserProvider, useAuth};
