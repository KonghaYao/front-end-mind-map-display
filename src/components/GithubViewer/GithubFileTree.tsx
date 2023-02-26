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
    const branch = atom("");
    const path = ArrayAtom(atom<string[]>([]));
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
                `https://api.github.com/repos/${props.user}/${
                    props.repo
                }/contents${pathString()}`,
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
                    <div
                        class="cursor-pointer"
                        onClick={() => path((i) => i.slice(0, i.length - 2))}>
                        上一个页面
                    </div>
                    <For each={data()}>
                        {(item) => {
                            const isFile = item.type === "file";
                            const src =
                                "https://cdn.jsdelivr.net/gh/vscode-icons/vscode-icons@12.2.0/icons/" +
                                (isFile
                                    ? getIconForFile(item.path)
                                    : getIconForFolder(item.path));
                            return (
                                <li
                                    class="cursor-pointer hover:bg-neutral-100 transition-colors flex items-center overflow-hidden whitespace-nowrap text-ellipsis"
                                    onClick={() => {
                                        if (isFile) {
                                            GithubApp.getApp("viewer")?.open(
                                                item.sha
                                            );
                                        } else {
                                            batch(() => {
                                                path((i) => [...i, item.path]);
                                            });
                                        }
                                    }}>
                                    <img
                                        src={src}
                                        class="h-6 w-6 pr-2"
                                        alt=""
                                        srcset=""
                                    />
                                    {item.name}
                                </li>
                            );
                        }}
                    </For>
                </Show>
            </ul>
        </aside>
    );
};
