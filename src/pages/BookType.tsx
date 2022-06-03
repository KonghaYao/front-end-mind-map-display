import { Link, router, routerHelper } from "../router/index";
import { repo } from "../store";
import get from "lodash-es/get";
import { For } from "solid-js";
import { FileCell } from "../components/fileSystemCell";
const findRoot = () => {
    const params = decodeURIComponent(router.getCurrentLocation().hashString)
        .split("/")
        .slice(2);
    const path = params;
    return [get(repo()?.tree, path), path] as const;
};
export const BookType = () => {
    const [root, path] = findRoot();
    return (
        <section className="h-full flex flex-col whitespace-pre-wrap relative font-song select-none ">
            <div
                onclick={() => {
                    const Path = path.slice(0, path.length - 2).join("/");
                    if (Path.length === 0) {
                        router.navigate("/index");
                    } else {
                        router.navigate("/book/" + Path);
                    }
                }}>
                上一个面板
            </div>
            <For each={Object.keys(root)}>
                {(tag) => {
                    if (tag === "__path") return;
                    const isFile = /\.\w+$/.test(tag);

                    return (
                        <Link
                            href={
                                (isFile ? "/file/" : /book/) +
                                `${path.join("/")}/${tag}`
                            }>
                            <FileCell path={tag}>{tag}</FileCell>
                        </Link>
                    );
                }}
            </For>
        </section>
    );
};
