import { createBlackBoard } from "@cn-ui/use";
import { GithubExplorer } from "./GithubFileTree";

export const GithubApp = createBlackBoard<{
    explorer: GithubExplorer;
    viewer: {
        open: (sha: string) => void;
    };
}>();
