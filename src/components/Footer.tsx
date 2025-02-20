import React, {useEffect} from "react";
import VfBanner from "./js/vf-banner.react";
import {textDecoration} from "../navigation/NavigationBar";
import {Link, useNavigate} from "react-router-dom";
import {LANDING_PAGE} from "../util/URIConstants";

const Background = {
    background: "#862E86"
}

export const Footer = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Create a style element
        const style = document.createElement("style");
        style.innerHTML = `
              .common-link {
                color: blue;
                text-decoration: underline !important;
                cursor: pointer;
              }
        `;

        document.head.appendChild(style);

        const privacyNoticeLink = document.getElementById("privacy-notice");
        const termsOfUseLink = document.getElementById("terms-of-use");

        privacyNoticeLink?.addEventListener("click", privacyNoticePage);
        termsOfUseLink?.addEventListener("click", termOfUsePage);

        return () => {
            privacyNoticeLink?.removeEventListener("click", privacyNoticePage);
            termsOfUseLink?.removeEventListener("click", termOfUsePage);
            document.head.removeChild(style);
        };
    }, []);

    const privacyNoticePage = () => {
        window.open("https://www.ebi.ac.uk/data-protection/privacy-notice/geneticscoresorg-public-website/", "_blank", "noopener, noreferrer");
    }

    const termOfUsePage = () => {
        window.open("https://www.ebi.ac.uk/about/terms-of-use", "_blank", "noopener, noreferrer");
    }

    const interveneProjectWebsite = () => {
        window.open("https://www.interveneproject.eu", "_blank", "noopener, noreferrer");
    }

    const navigateToHomePage = () => {
        navigate(LANDING_PAGE);
    }

    const bannerMessage = `This website uses cookies, and the limiting processing of your personal data to function. By using the site you are agreeing to this as outlined in our 
    <a id="privacy-notice" class="common-link">Privacy Notice</a> 
    and 
    <a id="terms-of-use" class="common-link">Terms Of Use</a>.
    `;
    return (
        <>
            <br/>
            <br/>
            <div className="vf-stack vf-stack--200">
                <div className="vf-box vf-box-theme--primary vf-box--normal" style={Background}>
                    <div className="vf-content">
                        <Link to="" style={textDecoration} onClick={() => navigateToHomePage()}>
                            <span className="vf-logo__text intervene-title">GeneticScores.org</span></Link> is part of the<Link to="" style={textDecoration} onClick={() => interveneProjectWebsite()}><span
                            className="vf-logo__text intervene-title"> INTERVENE</span></Link> project.
                    </div>
                    <br/>
                    <div>
                        INTERVENE has received funding from the European Union's Horizon 2020 research and
                        innovation programme under grant agreement No 101016775
                    </div>
                </div>
                <VfBanner banner__text="I agree, dismiss this banner"
                          banner__message={bannerMessage}
                          data_service_id="INTERVENE Service"
                          data_protection_version="1.0"/>
            </div>
        </>
    );
}
