import {DNA} from "react-loader-spinner";
import "../css/loading-spinner.css";

export const WebsiteLoadingSpinner = () => {
    return (
        <div className="overlay">
            <div className="spinner-container">
                <DNA
                    visible={true}
                    height="150"
                    width="150"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
        </div>
    );
};
