import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {NavigationBar} from "../navigation/NavigationBar";
import {AllRoutes} from "../routes/AllRoutes";
import {Footer} from "./Footer";
import {WebsiteLoadingSpinner} from "./WebsiteLoadingSpinner";
import {useAuth} from "../auth/UserProvider";
import "../css/general.css";
import "../css/anchor-button.css";

export const SecuredComponent = () => {
    const {isLoading} = useAuth();

    if (isLoading) {
        return <WebsiteLoadingSpinner/>;
    } else {
        return (
            <div className="fullscreen-div">
                <Router basename={process.env.PUBLIC_URL}>
                    <NavigationBar/>
                    <div className="inner-div">
                        <AllRoutes/>
                    </div>
                    <div className="footer">
                        <Footer/>
                    </div>
                </Router>
            </div>)
    }
}
