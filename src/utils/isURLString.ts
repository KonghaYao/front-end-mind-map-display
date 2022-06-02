import { CDN } from "../global";

export const isURLString = (url: string) => {
    return /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(
        url
    );
};
export const isLocal = (url: string) => {
    return url.startsWith(globalThis.location.origin);
};
export const isCDNLocal = (url: string) => {
    return url.startsWith(CDN);
};
