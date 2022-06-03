import { Plugin } from "./index";

import { createResource } from "solid-js";

export const Markdown: Plugin = function (props) {
    const [markdownHTML, {}] = createResource(async () => {
        const { createMarkdown } = await import("../../utils/remark");
        const file = await props.data.text();
        const mark = await createMarkdown().process(file);
        return mark.value as string;
    });
    return <div className="markdown-body" innerHTML={markdownHTML()}></div>;
};
