import { createResource } from "solid-js";
import { GithubViewer } from "./utils/githubViewer";

export const [repo, { refetch: refreshRepo }] = createResource(() => {
    return GithubViewer("jCodeLife", "mind-map");
});
