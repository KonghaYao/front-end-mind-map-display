import { Plugin } from "./index";

import { createResource } from "solid-js";
import { loadLink } from "../../utils/loadScript";
import { GH } from "../../global";

export const Markdown: Plugin = function (props) {
    const [markdownHTML, {}] = createResource(async () => {
        await loadLink(GH + "konghayao/demo-page/src/style/markdown.css");
        const { createMarkdown } = await import("../../utils/remark");
        const file = await props.data.text();
        const mark = await createMarkdown().process(file);
        return mark.value as string;
    });
    return (
        <div class="w-full h-full overflow-auto">
            <div className="markdown-body" innerHTML={markdownHTML()}></div>;
        </div>
    );
};
