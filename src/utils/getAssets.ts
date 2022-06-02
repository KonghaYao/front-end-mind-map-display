import { CDN } from "../global";

export const getAssets = <T>(
    path: string,
    type: "text" | "arrayBuffer" | "blob" | "json" = "text"
): Promise<T> => {
    return fetch(new URL(path, CDN).toString()).then((res) => res[type]());
};
