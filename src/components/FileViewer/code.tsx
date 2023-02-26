import { atom, resource } from "@cn-ui/use";
import { Viewer } from "./interface";
import { Monaco } from "@cn-ui/monaco";
let map = new Map<string, string>();
export const languageDetection = (path: string) => {
    const ext = path.replace(/.*(\.\w+?)$/, "$1");
    return map.get(ext);
};
export const CodeViewer: Viewer = (props) => {
    const code = resource(() => props.getData().then((res) => res.text()), {
        immediately: false,
        initValue: "",
    });
    const language = atom(
        (languageDetection(props.path) as any) ?? "javascript"
    );

    return (
        <Monaco
            value={code}
            language={language()}
            onReady={() => {
                map = new Map<string, string>(
                    globalThis.monaco.languages.getLanguages().flatMap((i) => {
                        return (i.extensions || []).map((ext) => [ext, i.id]);
                    })
                );
                language(languageDetection(props.path));
                code.refetch();
            }}></Monaco>
    );
};
