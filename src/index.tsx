import { render, Show } from "solid-js/web";
import { Route, router } from "./router/index";
import { loadLink } from "./utils/loadScript";
import { MainPage } from "./pages/MainPage";
import "./style/global.css";
import { BookType } from "./pages/BookType";
import { repo } from "./store";
import { FileType } from "./pages/FileType";
import { onMount } from "solid-js";
import { SearchPage } from "./pages/SearchPage";
/** 加载loading 的 WebComponent */
await import("wc-spinners");

router.notFound(() => {
    router.navigate("/index");
});

const App = () => {
    onMount(() => {
        router.navigate(location.hash.slice(1));
    });
    return (
        <section className="h-screen flex flex-col relative font-song select-none ">
            <header className="flex w-full  items-center bg-white ">
                <div className=" px-8 py-2 ">
                    <div className="text-2xl">前端脑图</div>
                </div>
                <div class="flex-grow flex justify-center">
                    <SearchPage></SearchPage>
                </div>
                <div onclick={() => history.back()} class="mx-4">
                    <div class="text-gray-600 cursor-pointer">返回</div>
                </div>
            </header>

            <main className="flex-grow bg-gray-50 p-4 overflow-auto noise-bg">
                <Show when={repo.loading}>
                    <div class="h-full w-full flex flex-col justify-center items-center">
                        <flower-spinner></flower-spinner>
                        <div>下载 Github 仓库索引中。。。</div>
                    </div>
                </Show>
                <Route path="/file/*" element={FileType}></Route>
                <Route path="/book/*" element={BookType}></Route>
                <Route path="/index" element={MainPage}></Route>
            </main>
        </section>
    );
};
render(() => <App />, document.body);
