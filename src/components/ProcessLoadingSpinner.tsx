import {DNA} from "react-loader-spinner";
import "../css/loading-spinner.css";

export const ProcessLoadingSpinner = () => {
    return (
        <div className="overlay-small-spinner">
            <div className="spinner-container">
                <DNA
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
        </div>
    );
}
