import {Link} from "react-router-dom";
import {menuTextColor} from "../NavigationBar";
import {useAuth} from "../../auth/UserProvider";
import {useMemo} from "react";

export const Logout = () => {
    const {logout} = useAuth();
    return useMemo(() => {
        return (
            <>
                <li className="vf-navigation__item" key="logout">
                    <Link className="vf-navigation__link vf-mega-menu__link"
                          style={menuTextColor}
                          onClick={() => logout()}
                          to="">Logout</Link>
                </li>
            </>
        )
    }, [logout]);
}
