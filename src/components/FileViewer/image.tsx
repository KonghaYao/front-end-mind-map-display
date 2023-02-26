import { atom, resource } from "@cn-ui/use";
import { Viewer } from "./interface";
import { Image } from "@cn-ui/core";
import { onCleanup } from "solid-js";
import IV from "awesome-image-viewer";
export const ImageViewer: Viewer = (props) => {
    const url = atom("");
    resource(() =>
        props.getData().then((res) => {
            console.log(res);
            try {
                URL.revokeObjectURL(url());
            } catch (e) {}
            url(URL.createObjectURL(res));
        })
    );
    onCleanup(() => URL.revokeObjectURL(url()));
    return (
        <div class=" flex justify-center flex-1">
            <img
                class="object-contain cursor-pointer"
                src={url()}
                onClick={() => {
                    new IV({ images: [{ mainUrl: url() }] });
                }}></img>
        </div>
    );
};
