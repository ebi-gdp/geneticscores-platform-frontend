import React, {CSSProperties, useCallback, useEffect, useState} from "react";
import {Document, Page, pdfjs} from "react-pdf";
import {useResizeObserver} from '@wojtekmaj/react-hooks';
import {deleteRequest, fetchData, postRequest} from "../../util/Fetch";
import {useAuth} from "../../auth/UserProvider";
import {SessionExpiredError} from "../error/SessionExpiredError";
import {HOMEPAGE_URI, LANDING_PAGE, USER_MANAGER_URI} from "../../util/URIConstants";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import '../../css/pdf.css';
import "../../css/general.css";
import "../../css/consent.css";
import {EMPTY, GIVEN, NOT_GIVEN, REVOKED} from "../../util/Constants";
import {ContentRenderHandler} from "../error/ContentRenderHandler";

const UserMessageConsentGiven: CSSProperties = {
    color: "green",
    textAlign: "center",
    fontWeight: "bold"
}

const UserMessageConsentRevoked: CSSProperties = {
    color: "red",
    textAlign: "center",
    fontWeight: "bold"
}

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
    cMapUrl: "/cmaps/",
    standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

export const DPAConsent = () => {
    const {user, consentEvent, setConsentEvent} = useAuth();
    const [numPages, setNumPages] = useState<number | null>(null);
    const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number | null>(null);
    const [pdfBase64, setPdfBase64] = useState<string>(EMPTY);
    const [consentAction, setConsentAction] = useState<boolean>(false);
    const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userMessage, setUserMessage] = useState<React.JSX.Element>(<div></div>);
    const [serverErrorMsg, setServerErrorMsg] = useState<string>(EMPTY);
    const userConsentURI = USER_MANAGER_URI + "/user/account/consent/data";

    useEffect(() => {
        setIsLoading(true);
        const fetchUserConsentDPA = async () => {
            try {
                const responseBody = await fetchData(userConsentURI);
                setPdfBase64(responseBody);
                setIsLoading(false);
            } catch (error: any) {
                if (error instanceof SessionExpiredError) {
                    setIsSessionExpired(true);
                } else {
                    setServerErrorMsg(error.message);
                }
                setIsLoading(false);
            }
        };
        fetchUserConsentDPA().then();
    }, [userConsentURI]);

    const onResize = useCallback((entries: ResizeObserverEntry[]) => {
        const [entry] = entries;
        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);

    useResizeObserver(containerRef, resizeObserverOptions, onResize);

    const onDocumentLoadSuccess = ({numPages: nextNumPages}: { numPages: number }) => {
        setNumPages(nextNumPages);
    };

    const giveConsent = async () => {
        setIsLoading(true);
        await postRequest(userConsentURI)
            .then(() => {
                setUserMessage(<div style={UserMessageConsentGiven}>You have successfully <b>"Given"</b> a consent!
                </div>);
                setConsentAction(true);
                setConsentEvent(GIVEN);
                setIsLoading(false);
            })
            .catch((reason) => {
                handleError(reason);
            });
    };

    const revokeConsent = async () => {
        setIsLoading(true);
        await deleteRequest(userConsentURI)
            .then(() => {
                setUserMessage(<div style={UserMessageConsentGiven}>You have successfully <b
                    style={UserMessageConsentRevoked}>"Revoked"</b> a consent!</div>);
                setConsentAction(true);
                setConsentEvent(REVOKED);
                setIsLoading(false);
            })
            .catch(reason => {
                handleError(reason);
            })
    };

    const handleError = (reason: any) => {
        if (reason instanceof SessionExpiredError) {
            setIsSessionExpired(true);
        } else {
            setServerErrorMsg(reason.message);
        }
    }

    const redirectToHomePage = () => {
        if (consentEvent === GIVEN) {
            window.location.href = HOMEPAGE_URI;
        } else if (consentEvent === REVOKED) {
            window.location.href = LANDING_PAGE;
        }
    };

    const renderContent = (
        <div className="PDF">
            <h1 className="consent-h1">User Data Processing Agreement</h1>
            <div className="PDF__container__document" ref={setContainerRef}>
                <Document
                    file={`data:application/pdf;base64,${pdfBase64}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                    options={options}>
                    {Array.from(new Array(numPages || 0), (_el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                        />
                    ))}
                </Document>
                <div className="button-center">
                    {user && (consentEvent === REVOKED || user.consentType === NOT_GIVEN) ? (
                        <button className="vf-button vf-button--primary vf-button--sm" onClick={giveConsent}>
                            Give consent
                        </button>
                    ) : (
                        <button className="vf-button vf-button--primary vf-button--sm" onClick={revokeConsent}>
                            Revoke consent
                        </button>
                    )}
                </div>
                <br/>
                <br/>
            </div>
        </div>
    );
    return <ContentRenderHandler
        isLoading={isLoading}
        isSessionExpired={isSessionExpired}
        serverErrorMsg={serverErrorMsg}
        consent={{consent: consentAction, userMessage: userMessage, redirectToHomePage: redirectToHomePage}}
        data={renderContent}/>;
};
