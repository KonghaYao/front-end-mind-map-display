import { JSXElement } from "solid-js";

/** Viewer 是用于加载可视化文件的组件 */
export interface Viewer {
    (props: { getData: () => Promise<Blob>; path: string }): JSXElement;
}
