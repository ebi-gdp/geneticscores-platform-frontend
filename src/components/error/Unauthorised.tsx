import {useAuth} from "../../auth/UserProvider";
import {Navigate} from "react-router-dom";
import {PGS_CALCULATOR} from "../../util/URIConstants";
import React from "react";

export const Unauthorised = () => {
    const {isAuthenticated, login} = useAuth();

    if (isAuthenticated) {
        return <Navigate to={PGS_CALCULATOR}/>;
    } else {
        return (
            <>
                <div className="overlay-unauthorized">
                    <div className="unauthorized-container">
                        <table className="message">
                            <tbody>
                            <tr>
                                <td><h2>You're currently not signed in</h2></td>
                            </tr>
                            <tr>
                                <td className="text-center-alignment">
                                    <button className="vf-button vf-button--primary vf-button--sm"
                                            onClick={() => login()}>Log
                                        in
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}
