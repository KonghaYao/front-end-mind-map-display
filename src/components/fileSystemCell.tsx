import { Component } from "solid-js";
import { getIconForFile } from "vscode-icons-js";
import { GH } from "../global";
export const FileCell: Component<{
    path: string;
}> = (props) => {
    const isFile = /\.\w+/.test(props.path);
    const img =
        GH +
        "vscode-icons/vscode-icons/icons/" +
        (isFile ? getIconForFile(props.path) : "default_folder.svg");
    return (
        <main class="flex items-center">
            <img class="flex-none w-4 h-4 mx-2" src={img}></img>
            {props.children}
        </main>
    );
};
