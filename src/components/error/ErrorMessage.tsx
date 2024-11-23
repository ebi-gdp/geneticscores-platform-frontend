interface ErrorMessageProps {
    errorMsg: string;
}

export const ErrorMessage = ({errorMsg}: ErrorMessageProps) => {
    return (
        <div className="vf-content">
            <br/>
            <p className="vf-text vf-text-heading--4">{errorMsg}</p>
        </div>
    );
}
