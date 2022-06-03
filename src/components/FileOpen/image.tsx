import { Plugin } from "./index";
import { createSignal, onCleanup } from "solid-js";
import { showImage } from "../../utils/showImage";

export const ImageViewer: Plugin = function (props) {
    const [src] = createSignal(URL.createObjectURL(props.data));

    onCleanup(() => {
        URL.revokeObjectURL(src());
    });

    return (
        <div class="flex-grow flex flex-col justify-center items-center">
            <img
                class="m-auto"
                src={src()}
                onclick={() =>
                    showImage(
                        [
                            {
                                src: src(),
                            },
                        ],
                        0
                    )
                }></img>
            <div>
                <span class="m-auto text-gray-400">点击可放大查看</span>
            </div>
        </div>
    );
};
