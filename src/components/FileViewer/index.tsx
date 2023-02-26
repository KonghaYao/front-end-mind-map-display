import { Dynamic } from "solid-js/web";
import { Viewer } from "./interface";
import { CodeViewer } from "./code";
import { onMount } from "solid-js";
import { GithubApp } from "../GithubViewer/App";
import { atom, reflect } from "@cn-ui/use";
import { MarkdownViewer } from "./md";
import { XMindViewer } from "./xmind/xmind";
import minimatch from "minimatch";
import { ImageViewer } from "./image";
const registerComp = [
    ["**/*.md", MarkdownViewer],
    ["**/*.xmind", XMindViewer],
    ["**/*.+(jpg|jpeg|png|webp|gif|svg)", ImageViewer],
] as [string, Viewer][];
export const FileViewer = (props: { path: string }) => {
    const realPath = atom(props.path);
    const comp = reflect(() => {
        console.log(props.path);
        if (props.path.endsWith("/") || location.href.endsWith("/"))
            return () => <div>请选择文件打开</div>;
        const path = realPath();
        const comp = registerComp.find(([key, value]) => {
            console.log(path, key);
            return minimatch(path, key);
        });
        return comp?.[1] ?? CodeViewer;
    });
    GithubApp.register("viewer", {
        open(path) {
            realPath(path);
        },
    });
    onMount(() => {});
    return (
        <Dynamic
            component={comp()}
            getData={() =>
                fetch(realPath(), { cache: "force-cache" }).then((res) =>
                    res.blob()
                )
            }
            path={realPath()}></Dynamic>
    );
};
