import { createResource, lazy, Suspense } from "solid-js";
import { registerComponent } from "../components/FileOpen/index";
import { router, routerHelper } from "../router/index";

// 配置文件查看器
import { Xmind } from "../components/FileOpen/xmind";
import { ImageViewer } from "../components/FileOpen/image";
import { GH } from "../global";
import { Markdown } from "../components/FileOpen/markdown";
registerComponent(Xmind, [".xmind"]);
registerComponent(ImageViewer, [".jpg", ".png"]);
registerComponent(Markdown, [".md"]);

export const FileType = () => {
    const path =
        GH +
        "jCodeLife/mind-map" +
        router.getCurrentLocation().hashString.replace(/^\/file/, "");
    const [data, { mutate }] = createResource<Blob>(async () => {
        return new Blob();
    });
    const Init = lazy(async () => {
        const fileBlob = await fetch(path).then((res) => res.blob());
        mutate(fileBlob);
        console.log(fileBlob);
        return import("../components/FileOpen/index").then(({ FileOpen }) => ({
            default: FileOpen,
        }));
    });
    return (
        <div className="flex-grow flex flex-col h-full justify-center items-center whitespace-pre-wrap relative font-song select-none ">
            <Suspense
                fallback={
                    <div class="flex-grow flex flex-col h-full w-full justify-center items-center">
                        <flower-spinner></flower-spinner>
                        <div>下载文件中</div>
                    </div>
                }>
                <Init path={path} data={data()!}></Init>
            </Suspense>
        </div>
    );
};
