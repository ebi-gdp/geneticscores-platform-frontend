import {HOMEPAGE_URI, LANDING_PAGE} from "./URIConstants";
import {EMPTY} from "./Constants";

const defaultTimestamp = "01-01-0001 00:00:00";

export const isInvalidSession = (response: any) => {
    return response.status === 401 || response.status === 403;
}

export const homePageRedirect = () => {
    window.location.href = HOMEPAGE_URI;
}

export const landingPageRedirect = () => {
    window.location.href = LANDING_PAGE === EMPTY ? "/" : LANDING_PAGE;
}

const calculateMinutesToExpire = (lastAccessTime: string,
                                  maxIdleTime: string): number => {
    const lastAccessDate = new Date(lastAccessTime);
    const maxIdleMilliseconds = parseDuration(maxIdleTime); // Convert maxIdleTime to milliseconds
    const expirationTime = new Date(lastAccessDate.getTime() + maxIdleMilliseconds);
    const currentTime = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = expirationTime.getTime() - currentTime.getTime();

    // Convert milliseconds to minutes
    return Math.floor(timeDifference / 60000);
};

const parseDuration = (duration: string): number => {
    const minutesMatch = duration.match(/PT(\d+)M/);
    if (minutesMatch) {
        return parseInt(minutesMatch[1], 10) * 60000; // Convert minutes to milliseconds
    }
    return 0;
};

export const isSessionExpiredGlobal = (lastAccessTime: string,
                                       maxIdleTime: string) => {
    const sessionExpiresIn = calculateMinutesToExpire(lastAccessTime, maxIdleTime);
    console.log("Session expires In: " + sessionExpiresIn);
    return sessionExpiresIn <= 0;
}

export const formatTimestamp = (timestamp: string) => {
    return timestamp === defaultTimestamp ? "-" : timestamp;
}

export const successfulPipelineSubmissionMsg = (pipelineId: string): string => {
    return `<b>Your pipeline request has been successfully submitted (Pipeline ID: ${pipelineId}).<br/>
    Check the Dashboard for status updates. You will receive an email when the job is
    complete.</b>`;
};

export const tooManyRequestsMsg = () => {
    return `<b>You have exhausted your daily quota of <a href="https://docs.geneticscores.org/how-to/scores#limits">5 pipeline submissions per day.</a></b>`;
};
