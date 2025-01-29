import {useAuth} from "../../auth/UserProvider";

export const Unauthorised = () => {
    const {login} = useAuth();
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
