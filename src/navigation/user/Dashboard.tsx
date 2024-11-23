import {Link, useNavigate} from "react-router-dom";
import {menuTextColor} from "../NavigationBar";
import {PGS_CALCULATOR} from "../../util/URIConstants";
import {ValidateSessionType} from "../AuthorizedNavigation";

export const Dashboard = ({validateSession}: ValidateSessionType) => {
    const navigation = useNavigate();

    const navigateToPgsCalculator = () => {
        validateSession();
        navigation(PGS_CALCULATOR);
    }

    const navigateToDashboard = () => {
        validateSession();
        navigation(PGS_CALCULATOR + "/dashboard");
    }
    return (
        <>
            <li className="vf-navigation__item" key="pgs_calculator">
                <Link className="vf-navigation__link vf-mega-menu__link"
                      style={menuTextColor}
                      to="#"
                      onClick={(event) => {
                          event.preventDefault();
                          navigateToPgsCalculator();
                      }}>PGS Calculator</Link>
            </li>
            <li className="vf-navigation__item" key="dashboard">
                <Link className="vf-navigation__link vf-mega-menu__link"
                      style={menuTextColor}
                      to="#"
                      onClick={(event) => {
                          event.preventDefault();
                          navigateToDashboard();
                      }}>Dashboard</Link>
            </li>
        </>
    );
}
