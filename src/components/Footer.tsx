import React from "react";
import VfBanner from "./js/vf-banner.react";

const Background = {
    background: "#862E86"
}

export const Footer = () => {
    const bannerMessage = "This website uses cookies, and the limiting processing of your personal data to function. By using the site you are agreeing to this as outlined in our <a className='vf-banner__link' style='color: white; text-decoration: underline' href='JavaScript:Void(0);'>Privacy Notice</a> and <a className='vf-banner__link' style='color: white; text-decoration: underline' href='JavaScript:Void(0);'>Terms Of Use</a>.";
    return (
        <>
            <br/>
            <br/>
            <div className="vf-stack vf-stack--200">
                <div className="vf-box vf-box-theme--primary vf-box--normal" style={Background}>
                    <div className="vf-content">
                        GeneticScores.org is part of the INTERVENE project.
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
