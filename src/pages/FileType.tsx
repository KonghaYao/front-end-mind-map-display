import { createResource, lazy, Suspense } from "solid-js";
import { registerComponent } from "../components/FileOpen/index";
import { router, routerHelper } from "../router/index";

// 配置文件查看器
import { Xmind } from "../components/FileOpen/xmind";
import { ImageViewer } from "../components/FileOpen/image";
registerComponent(Xmind, [".xmind"]);
registerComponent(ImageViewer, [".jpg", ".png"]);

export const FileType = () => {
    const path =
        "https://fastly.jsdelivr.net/gh/jCodeLife/mind-map" +
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
        <section className="flex-grow flex  flex-col h-full whitespace-pre-wrap relative font-song select-none ">
            <div
                onclick={() => {
                    routerHelper.back();
                }}>
                返回
            </div>
            <Suspense
                fallback={
                    <div class="flex-grow flex flex-col h-full w-full justify-center items-center">
                        <flower-spinner></flower-spinner>
                        <div>下载文件中</div>
                    </div>
                }>
                <Init path={path} data={data()!}></Init>
            </Suspense>
        </section>
    );
};
