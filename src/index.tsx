import { render, Show } from "solid-js/web";
import { Route } from "./router/index";
import { loadLink } from "./utils/loadScript";
import { MainPage } from "./pages/MainPage";
import "./style/global.css";
import { BookType } from "./pages/BookType";
import { repo } from "./store";
import { FileType } from "./pages/FileType";
/** 加载loading 的 WebComponent */
await import("wc-spinners");

/* shoelace 的样式表 */
await loadLink(
    "https://unpkg.com/@shoelace-style/shoelace@2.0.0-beta.73/dist/themes/light.css"
);
/* Material Icon 字体图标 */
await loadLink("https://fonts.googleapis.com/css2?family=Material Icons");

const App = () => {
    return (
        <section className="h-screen flex flex-col relative font-song select-none ">
            <header className="flex w-full justify-center bg-white ">
                <div className="w-full px-8 py-2 ">
                    <div className="text-2xl">前端脑图</div>
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
