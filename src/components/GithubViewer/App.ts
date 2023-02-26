import { createBlackBoard } from "@cn-ui/use";
import { GithubExplorer } from "./GithubFileTree";

export const GithubApp = createBlackBoard<{
    explorer: GithubExplorer;
    viewer: {
        open: (path: string) => void;
    };
}>();
