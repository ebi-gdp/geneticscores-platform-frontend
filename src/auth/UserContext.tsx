import {createContext} from "react";
import {EMPTY} from "../util/Constants";

export type UserDetails = {
    accountId: string,
    givenName: string,
    familyName: string,
    emailId: string
    consentType: string
}

export type CurrentUserContextType = {
    createAccount: () => void,
    createAccountError: string,
    isAuthenticated: boolean,
    login: () => void,
    logout: () => void,
    sessionExpiresIn: number,
    setSessionExpiresIn: (arg: number) => void,
    isLoading: boolean,
    user: UserDetails | null,
    consentEvent: string,
    setConsentEvent: (arg: string) => void,
    lastAccessTime: string,
    updateLastAccessTime: () => void,
    maxIdleTime: string,
    resetUser: () => void,
    error: string
}

export const UserContext = createContext<CurrentUserContextType>({
    createAccount: () => () => {
    },
    createAccountError: EMPTY,
    isAuthenticated: false,
    login: () => {
    },
    logout: () => {
    },
    sessionExpiresIn: 0,
    setSessionExpiresIn: () => {
    },
    isLoading: false,
    user: null,
    consentEvent: EMPTY,
    setConsentEvent: () => {
    },
    lastAccessTime: EMPTY,
    updateLastAccessTime: () => {
    },
    maxIdleTime: EMPTY,
    resetUser: () => {
    },
    error: EMPTY
});
