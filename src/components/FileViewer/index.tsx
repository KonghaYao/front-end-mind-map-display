import { Dynamic } from "solid-js/web";
import { Viewer } from "./interface";
import { CodeViewer } from "./code";
import { onMount } from "solid-js";
import { GithubApp } from "../GithubViewer/App";
import { atom, reflect } from "@cn-ui/use";
const registerComp = new Map<string, Viewer>([]);
export const FileViewer = (props: { path: string }) => {
    const realPath = atom(props.path);
    const comp = reflect(() => {
        const ext = realPath().replace(/.*(\.\w+?)$/, "$1");
        if (ext) {
            return registerComp.get(ext) ?? CodeViewer;
        } else {
            return () => <div>请选择文件打开</div>;
        }
    });
    GithubApp.register("viewer", {
        open(path) {
            realPath(path);
            console.log(realPath());
        },
    });
    onMount(() => {});
    return (
        <Dynamic
            component={comp()}
            getData={() => fetch(realPath()).then((res) => res.blob())}
            path={realPath()}></Dynamic>
    );
};
