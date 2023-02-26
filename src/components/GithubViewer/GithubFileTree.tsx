import { ArrayAtom, atom, reflect, resource } from "@cn-ui/use";
import { For, Show, batch, onMount } from "solid-js";
import {
    getIconForFolder,
    getIconForFile,
    getIconForOpenFolder,
} from "vscode-icons-js";
import { GithubApp } from "./App";

export interface GithubExplorer {}

export const GithubFileTree = (props: { user: string; repo: string }) => {
    const shaStack = atom([]);
    const sha = atom("master");
    const path = ArrayAtom(atom([]));
    const pathString = reflect(() => {
        if (path().length) {
            return "/" + path().join("/");
        } else {
            return "";
        }
    });
    const data = resource(
        () =>
            fetch(
                `https://api.github.com/repos/${props.user}/${props.repo}/git/trees/` +
                    sha(),
                {
                    cache: "force-cache",
                }
            ).then((res) => res.json()),
        { deps: [pathString] }
    );
    onMount(() => {
        GithubApp.register("explorer", {});
    });
    return (
        <aside class="w-40 text-ellipsis whitespace-nowrap  h-full p-2 bg-white flex flex-col cursor-default border-r border-neutral-400">
            <ul>
                <Show when={data.isReady()}>
                    <div>上一个页面</div>
                    <For each={data()?.tree}>
                        {(item) => {
                            const isFile = item.type === "blob";
                            const src =
                                "https://cdn.jsdelivr.net/gh/vscode-icons/vscode-icons@12.2.0/icons/" +
                                (isFile
                                    ? getIconForFile(item.path)
                                    : getIconForFolder(item.path));
                            return (
                                <li
                                    class="cursor-pointer hover:bg-neutral-100 transition-colors flex items-center "
                                    onClick={() => {
                                        if (isFile) {
                                            GithubApp.getApp("viewer")?.open(
                                                sha()
                                            );
                                        } else {
                                            batch(() => {
                                                path((i) => [...i, item.path]);
                                                shaStack((i) => [...i, sha()]);
                                                sha(item.sha);
                                            });
                                        }
                                    }}>
                                    <img
                                        src={src}
                                        class="h-6 w-6 pr-2"
                                        alt=""
                                        srcset=""
                                    />
                                    {item.path}
                                </li>
                            );
                        }}
                    </For>
                </Show>
            </ul>
        </aside>
    );
};
