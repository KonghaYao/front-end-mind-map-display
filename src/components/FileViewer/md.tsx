import { Viewer } from "./interface";
import { Typography } from "@cn-ui/core";
import { Markdown } from "@cn-ui/markdown";
import { resource } from "@cn-ui/use";
import "@cn-ui/core/dist/style.css";
export const MarkdownViewer: Viewer = (props) => {
    const code = resource(() => props.getData().then((res) => res.text()));
    return (
        <div class="max-w-4xl m-auto">
            <Typography>
                <Markdown code={code}></Markdown>
            </Typography>
        </div>
    );
};
