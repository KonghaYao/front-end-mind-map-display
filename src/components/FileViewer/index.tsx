import { Dynamic } from "solid-js/web";
import { Viewer } from "./interface";
import { CodeViewer } from "./code";
import { onMount } from "solid-js";
import { GithubApp } from "../GithubViewer/App";
import { atom, reflect } from "@cn-ui/use";
import { MarkdownViewer } from "./md";
const registerComp = new Map<string, Viewer>([[".md", MarkdownViewer]]);
export const FileViewer = (props: { path: string }) => {
    const realPath = atom(props.path);
    const comp = reflect(() => {
        const ext = realPath().replace(/.*(\.\w+?)$/, "$1");
        if (ext && ext !== realPath()) {
            return registerComp.get(ext) ?? CodeViewer;
        } else {
            return () => <div>请选择文件打开</div>;
        }
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
