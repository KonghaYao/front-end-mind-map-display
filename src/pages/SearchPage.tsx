import { createEffect, createSignal, For } from "solid-js";
import "xy-ui/components/xy-datalist.js";
import "xy-ui/components/xy-input.js";
import "xy-ui/components/xy-option.js";
import { router } from "../router/index";
import { repo } from "../store";
import debounce from "lodash-es/debounce";
export const SearchPage = () => {
    const [options, setOptions] = createSignal(
        [] as { value: string; label: string }[]
    );
    const [search, setSearch] = createSignal("");
    createEffect(() => {
        if (!search()) return;
        const reg = new RegExp(search());
        const last = repo()!
            .element.filter((i) => {
                return reg.test(i.path);
            })
            .map((i) => {
                return { value: i.path, label: i.name };
            })
            .slice(0, 10);
        setOptions(last);
    });
    return (
        <>
            <xy-input
                placeholder="请使用正则表达式搜索文件"
                class="w-full md:w-1/2 flex bg-gray-100 rounded-xl"
                attr:list="city"
                style="font-family:'Noto Serif SC'"
                on:input={debounce((e: any) => {
                    console.log(e);
                    setSearch(e.target.value);
                }, 300)}></xy-input>
            <xy-datalist id="city">
                <For each={options()}>
                    {(option) => {
                        return (
                            <xy-option
                                class="flex flex-col"
                                value={option.label}
                                attr:key={option.value}
                                onclick={() => {
                                    router.navigate("/file/" + option.value);
                                }}>
                                <div
                                    class="whitespace-nowrap w-full"
                                    style="font-family:'Noto Serif SC'">
                                    {option.label}
                                </div>
                                <span
                                    class=" text-gray-400  whitespace-nowrap overflow-hidden text-ellipsis"
                                    style="width:75%;font-size:0.7rem;font-family:'Noto Serif SC'">
                                    {option.value}
                                </span>
                            </xy-option>
                        );
                    }}
                </For>
            </xy-datalist>
        </>
    );
};
