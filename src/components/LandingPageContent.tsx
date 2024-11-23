import {CSSProperties} from "react";

export const divHeight: CSSProperties = {
    height: "500px"
}

interface LoginType {
    login: () => void,
}

export const LandingPageContent = ({login}: LoginType) => {
    const documentationPage = () => {
        window.open("https://docs.intervenegeneticscores.org", "_blank", "noopener, noreferrer");
    }
    return (
        <div className="vf-content" style={divHeight}>
            <h1 className="vf-text vf-text-heading--1">PGS Calculator</h1>
            <p className="vf-text-body vf-text-body--3">The PGS Calculator is an online tool for the application of
                polygenic scores (PGS) to individual level genetic data. You upload genetic data, choose scores from
                the PGS Catalog to apply and receive individual scores back.</p>
            <div className="vf-grid vf-grid__col-2">
                <div className="vf-box">
                    <h3>Before you start</h3>
                    Key requirements
                    <ul className="vf-list | vf-list--tight vf-list--unordered">
                        <li className="vf-list__item">Your data need to be encrypted.</li>
                        <li className="vf-list__item">You need to set up a free Globus account and install Globus
                            Connect on your computer to securely transfer data to us.
                        </li>
                        <li className="vf-list__item">You will need to sign a Data Processing Agreement (DPA).</li>
                        <li className="vf-list__item">Your data need to be in a specific format.</li>
                    </ul>
                    <br/>
                    To understand the process and the requirements please read the documentation.
                    <br/>
                    <br/>
                    <button className="vf-button vf-button--primary vf-button--sm"
                            onClick={() => documentationPage()}>Read the docs
                    </button>
                </div>
                <div className="vf-box">
                    <h3>Ready to start?</h3>
                    If you are ready to upload data please log in to use our service.
                    <br/><br/>
                    After log in you will be lead through the process of uploading data and configuring the
                    pipeline.
                    <br/>
                    <br/>
                    <button className="vf-button vf-button--primary vf-button--sm" onClick={() => login()}>Log in
                    </button>
                </div>
            </div>
        </div>
    );
}
