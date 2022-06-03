import { Plugin } from "./index";
import {
    createEffect,
    createResource,
    createSignal,
    onMount,
    Show,
} from "solid-js";

// 修改一下 插件里面 的 iframe 地址，让其指向我的加速网页
/** 原本仓库为  xmind-embed-viewer */
import { XMindEmbedViewer } from "../../utils/xmind/index";

export const Xmind: Plugin = function (props) {
    let el: HTMLDivElement;
    const [file] = createResource(() => {
        return props.data.arrayBuffer();
    });
    let Control: XMindEmbedViewer;

    const [loading, setLoading] = createSignal(true);
    onMount(() => {
        Control = new XMindEmbedViewer({
            el,
            file: file(),
            url: "https://konghayao-demo-page.netlify.app/assets/xmind.html",
        });
        const iframe = (Control as any).iframeController
            .iframe as HTMLIFrameElement;
        iframe.style.setProperty("height", "100%");
        iframe.style.setProperty("width", "100%");
        Control.addEventListener("map-ready", () => {
            setLoading(false);
            console.log("load");
        });
        console.log(Control);
    });
    createEffect(() => {
        if (Control && file()) {
            Control.load(file()!);
        }
    });

    return (
        <>
            <Show when={loading()}>
                <div class="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center">
                    <flower-spinner></flower-spinner>
                    <div>加载 xmind 中</div>
                </div>
            </Show>
            <div
                class="flex-grow flex flex-col justify-center items-center h-full w-full overflow-auto"
                ref={el!}></div>
        </>
    );
};
