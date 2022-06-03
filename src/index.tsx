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

            <div className="flex-grow bg-gray-50 p-4 flex overflow-y-auto w-full noise-bg">
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
                <Route path="/file/*" element={FileType}></Route>
                <Route path="/book/*" element={BookType}></Route>
                <Route path="/index" element={MainPage}></Route>
            </div>
            <footer class="p-2 flex w-full items-center bg-white overflow-hidden">
                <Show when={window.screen.availWidth <= 500}>
                    <ControlBar></ControlBar>
                </Show>
            </footer>
        </section>
    );
};
render(() => <App />, document.body);
