import { atom, reflect, resource, useEffectWithoutFirst } from "@cn-ui/use";
import { For, Show, batch, createEffect, onMount } from "solid-js";
import { getIconForFolder, getIconForFile } from "vscode-icons-js";
import { GithubApp } from "./App";

export interface GithubExplorer {}
export const updateHistory = (url: string) => {
    const newURL = new URL(url, location.origin);
    history.pushState({ status: 0 }, "", newURL);
};

export const GithubFileTree = (props: {
    user: string;
    repo: string;
    path: string;
}) => {
    const branch = atom("");

    const newPath = (props.path ?? "").split("/").filter(Boolean);
    const path = atom<string[]>(
        // 因为 astro 处理的时候忽略了最后的一个 / 号，所以我们换成客户端识别尾部 / 作为文件夹
        location.href.endsWith("/")
            ? newPath
            : newPath.slice(0, newPath.length - 1)
    );
    // createEffect(() => console.log(props.path, newPath, path()));
    const pathString = reflect(() => {
        if (path().length) {
            return "/" + path().join("/") + "/";
        } else {
            return "/";
        }
    });
    /** 获取指定的字符串 */
    const getBaseString = () => {
        return `/${props.user}/${props.repo}${pathString()}`;
    };
    // 保存地址到地址栏
    useEffectWithoutFirst(
        () => updateHistory(`/gh/${getBaseString()}`),
        [pathString, () => props.user, () => props.repo]
    );
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
                        onClick={() => path((i) => i.slice(0, i.length - 1))}>
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
                                            updateHistory(
                                                `/gh/${getBaseString()}${
                                                    item.name
                                                }`
                                            );
                                            GithubApp.getApp("viewer")?.open(
                                                `https://cdn.jsdelivr.net/gh/${getBaseString()}${
                                                    item.name
                                                }`
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
