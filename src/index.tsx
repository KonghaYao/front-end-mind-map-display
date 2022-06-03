import { render, Show } from "solid-js/web";
import { Route, router } from "./router/index";
import { MainPage } from "./pages/MainPage";
import "./style/global.css";
import { BookType } from "./pages/BookType";
import { repo, refreshRepo } from "./store";
import { FileType } from "./pages/FileType";
import { Component, createMemo, Match, onMount, Switch } from "solid-js";
import { SearchPage } from "./pages/SearchPage";
/** 加载loading 的 WebComponent */
await import("wc-spinners");

router.notFound(() => {
    router.navigate("/index");
});

const ControlBar: Component = () => {
    return (
        <>
            <div
                onclick={() => {
                    const origin = location.hash;
                    history.back();
                    // 暂停 100ms 等待浏览器转换完成
                    setTimeout(() => {
                        const isSuccess = location.hash !== origin;

                        !isSuccess && router.navigate("/index");
                    }, 100);
                }}
                class="mx-4 flex-none">
                <div class="text-gray-600 cursor-pointer">返回</div>
            </div>
        </>
    );
};
import "@shoelace-style/shoelace/dist/components/split-panel/split-panel.js";
import { loadLink } from "./utils/loadScript";
await loadLink(
    "https://fastly.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.74/dist/themes/light.css"
);
const App = () => {
    onMount(() => {
        router.navigate(location.hash.slice(1));
    });
    return (
        <section className="h-screen w-screen flex flex-col overflow-hidden relative font-song select-none ">
            <header className="flex w-full items-center bg-white overflow-hidden">
                <div className="px-2 md:px-8 py-2 flex-none">
                    <div className="text-2xl">前端脑图</div>
                </div>
                <div class="flex-grow flex justify-center">
                    <SearchPage></SearchPage>
                </div>
                <Show when={window.screen.availWidth > 500}>
                    <ControlBar></ControlBar>
                </Show>
            </header>

            <div className="flex-grow bg-gray-50 p-4 flex overflow-y-auto w-full noise-bg h-12">
                <Switch>
                    <Match when={repo.error}>
                        <div class="h-full w-full flex flex-col justify-center items-center">
                            <div class="m-4" style="font-size:10vw">
                                /(ㄒoㄒ)/~~
                            </div>
                            <div class="text-red-300">
                                **下载 Github
                                仓库索引失败，这可能是您的网络不太好 **
                            </div>
                            <button
                                class="bg-green-500 text-white px-2 py-1 m-2"
                                onclick={refreshRepo}>
                                重新下载
                            </button>
                        </div>
                    </Match>
                    <Match when={repo.loading}>
                        <div class="h-full w-full flex flex-col justify-center items-center">
                            <flower-spinner></flower-spinner>
                            <div>下载 Github 仓库索引中。。。</div>
                        </div>
                    </Match>
                </Switch>
                <sl-split-panel class="w-full" position="25">
                    <div slot="start">
                        <MainPage></MainPage>
                    </div>
                    <div slot="end" class="p-2 h-full overflow-auto">
                        <Route path="/file/*" element={FileType}></Route>
                        <Route path="/book/*" element={BookType}></Route>
                        <Route
                            path="/index"
                            element={() => (
                                <div class="text-gray-400 flex flex-col h-full w-full justify-center items-center">
                                    <div style="font-size:10vw">(*^_^*)</div>
                                    <div>请点击左侧文件加载哦</div>
                                </div>
                            )}></Route>
                    </div>
                </sl-split-panel>
            </div>
            <footer class="p-2 flex w-full items-center bg-white overflow-hidden">
                <div class="text-sm md:text-xs text-gray-500">
                    <a
                        href="https://github.com/jCodeLife/mind-map"
                        class="text-sky-400">
                        MindMap
                    </a>{" "}
                    Created By
                    <a href="https://github.com/jCodeLife" class="text-sky-400">
                        {" "}
                        jCodeLife{" "}
                    </a>
                    |{" "}
                    <a
                        href="https://github.com/KonghaYao/front-end-mind-map-display"
                        class="text-sky-400">
                        WebSite
                    </a>
                    Made by
                    <a href="https://github.com/KonghaYao" class="text-sky-400">
                        {" "}
                        KonghaYao{" "}
                    </a>
                    |
                </div>
                <Show when={window.screen.availWidth <= 500}>
                    <ControlBar></ControlBar>
                </Show>
            </footer>
        </section>
    );
};
render(() => <App />, document.body);
