import { atom, reflect, resource } from "@cn-ui/use";
import { Viewer } from "./interface";
import { Monaco } from "@cn-ui/monaco";
import { Ext } from "./utils/codeExt";
import { createEffect } from "solid-js";
export const languageDetection = (path: string) => {
    const ext = path.replace(/.*(\.\w+?)$/, "$1");
    return Ext.get(ext);
};
export const CodeViewer: Viewer = (props) => {
    const code = resource(() => props.getData().then((res) => res.text()), {
        immediately: false,
        initValue: "",
        deps: [() => props.path],
    });
    const language = reflect(
        () => (languageDetection(props.path) as any) ?? "javascript"
    );
    createEffect(() => {
        console.log("更改语言", language());
    });
    return (
        <Monaco
            value={code}
            language={language}
            onReady={() => {
                code.refetch();
            }}></Monaco>
    );
};
