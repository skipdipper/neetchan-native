/*
    Formats unix timestamp (seconds) to relative time in days, hours, minutes or seconds
    Manually formated as Hermes has yet to support Intl.RelativeTimeFormat
    Alternatively use Moment.js or FormatJs
*/
export function formatRelativeTime(seconds: number) {
    const now = Date.now();
    const time = seconds * 1000;
    const diff = relativeTime(now - time);

    if (diff.inDays > 1) {
        return `${diff.inDays} days ago`;
    } else if (diff.inDays == 1) {
        return `${diff.inDays} day ago`;
    } else if (diff.inHours > 1) {
        return `${diff.inHours} hrs ago`;
    } else if (diff.inHours == 1) {
        return `${diff.inHours} hr ago`;
    } else if (diff.inMinutes > 1) {
        return `${diff.inMinutes} mins ago`;
    } else if (diff.inMinutes == 1) {
        return `${diff.inMinutes} min ago`;
    } else if (diff.inSeconds > 1) {
        return `${diff.inSeconds} secs ago`;
    } else if (diff.inSeconds == 1) {
        return `${diff.inSeconds} sec ago`;
    } else {
        return 'just now';
    }
}

/* 
    Helper Factory function that converts from milliseconds to 
    days, hours, minutes and seconds
*/
function relativeTime(milliseconds: number) {
    const inDays = () => {
        return Math.floor(milliseconds / 86400000);
    }

    const inHours = () => {
        return Math.floor(milliseconds / 3600000);
    }

    const inMinutes = () => {
        return Math.floor(milliseconds / 60000);
    }

    const inSeconds = () => {
        return Math.floor(milliseconds / 1000);
    }

    /*
        Getter instead of properties assigned to regular functions 
        to avoid immediate method invocation at object creation
    */
    return {
        get inDays() { return inDays() },
        get inHours() { return inHours() },
        get inMinutes() { return inMinutes() },
        get inSeconds() { return inSeconds() },
    }
}