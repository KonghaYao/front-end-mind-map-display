import { createEffect, createMemo, createSignal, For } from "solid-js";
import { FileCell } from "../components/fileSystemCell";
import { Link } from "../router/index";
import { repo } from "../store";

export const MainPage = () => {
    const [Tags, setTag] = createSignal<string[]>([]);
    createEffect(() => {
        const keys = Object.keys(repo()?.tree || {});
        setTag(keys);
    });

    return (
        <section className="h-screen flex flex-col whitespace-pre-wrap relative font-song select-none ">
            <For each={Tags()}>
                {(tag) => {
                    return (
                        <Link href={`/book/${tag}/`}>
                            <FileCell path={tag}>{tag}</FileCell>
                        </Link>
                    );
                }}
            </For>
        </section>
    );
};
