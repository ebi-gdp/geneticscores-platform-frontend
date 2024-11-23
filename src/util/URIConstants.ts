//BFF microservices URI
import {EMPTY} from "./Constants";

export const PIPELINE_MANAGER_URI: string = process.env.REACT_APP_PIPELINE_MANAGER_URI || EMPTY;
export const FILE_HANDLER_URI: string = process.env.REACT_APP_FILE_HANDLER_URI || EMPTY;
export const USER_MANAGER_URI: string = process.env.REACT_APP_USER_MANAGER_URI || EMPTY;
export const BFF_LOGOUT: string = process.env.REACT_APP_BFF_LOGOUT_URI || EMPTY;

//Platform routes
export const UNAUTHORISED: string = "/unauthorised";
export const LANDING_PAGE: string = process.env.PUBLIC_URL || EMPTY;
export const PGS_CALCULATOR: string = "/pgs-calculator";
export const HOMEPAGE_URI: string = process.env.PUBLIC_URL + PGS_CALCULATOR;
export const DOWNLOAD_RESULTS_URI: string = PGS_CALCULATOR + "/result";
export const DATASET_URI: string = PGS_CALCULATOR + "/dataset";
export const DATASETS_URI: string = PGS_CALCULATOR + "/datasets";
export const PROFILE_URI: string = "/profile";
export const DPA_URI: string = "/dpa";
export const NOT_FOUND_URI: string = "/not-found";

//External URL
export const GLOBUS_FILE_MANAGER_URI: string = "https://app.globus.org/file-manager";
