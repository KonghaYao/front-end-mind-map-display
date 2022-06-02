import "spotlight.js";
import { useGlobal } from "./useGlobal";
export const Spotlight = useGlobal<any>("Spotlight");
/** 实现图片大屏展示 */
export function showImage(
    images: { src: string; title?: string; description?: string }[],
    index: number
): void {
    return Spotlight.show(images, {
        class: "only-this-gallery",
        index: index + 1,
        control: [
            "page",
            "theme",
            "fullscreen",
            "autofit",
            "zoom-in",
            "zoom-out",
            "close",
            "download",
            "play",
            "prev",
            "next",
        ],
        animation: "scale",
    });
}
