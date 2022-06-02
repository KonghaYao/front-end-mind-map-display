import { Plugin } from "./index";
import { createEffect, createResource, createSignal, onMount } from "solid-js";
import { CDN } from "../../global";

// 修改一下 插件里面 的 iframe 地址，让其指向我的加速网页
/** 原本仓库为  xmind-embed-viewer */
import { XMindEmbedViewer } from "../../utils/xmind/index";

export const Xmind: Plugin = function (props) {
    let el: HTMLDivElement;
    const [file] = createResource(() => {
        return props.data.arrayBuffer();
    });
    let Control: XMindEmbedViewer;
    onMount(() => {
        Control = new XMindEmbedViewer({
            el,
            url: "https://konghayao-demo-page.netlify.app/assets/xmind.html",
        });
        Control.load(file()!);
        console.log(Control);
    });
    createEffect(() => {
        if (Control && file()) {
            Control.load(file()!);
            const iframe = (Control as any).iframeController
                .iframe as HTMLIFrameElement;
            iframe.style.setProperty("height", "100%");
            iframe.style.setProperty("width", "100%");
        }
    });
    return (
        <div
            class="flex-grow flex flex-col justify-center items-center h-full w-full"
            ref={el!}></div>
    );
};
