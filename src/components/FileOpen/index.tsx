import { Component, Match, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";
export type Plugin = Component<{
    path: string;
    data: Blob;
}>;
const components = new Map<string, Plugin>();

export const registerComponent = (component: Plugin, extensions: string[]) => {
    extensions.map((i) => {
        components.set(i, component);
    });
};
const getExtname = (path: string) => {
    return path.replace(/.*(\.\w+).*/, "$1");
};
export const FileOpen: Component<{
    path: string;
    data: Blob;
}> = (props) => {
    const ext = getExtname(props.path);
    const comp = components.get(ext);
    return (
        <div className="flex-grow h-full flex flex-col relative font-song select-none ">
            <Switch fallback={<div>暂时没有解析的插件</div>}>
                <Match when={comp}>
                    <Dynamic component={comp} {...props}></Dynamic>
                </Match>
            </Switch>
        </div>
    );
};
