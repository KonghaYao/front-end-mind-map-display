import set from "lodash-es/set";
export const GithubViewer = async (user: string, repo: string) => {
    const result = {};
    return await fetch(
        `https://api.github.com/repos/${user}/${repo}/git/trees/master?recursive=1`,
        { cache: "force-cache" }
    )
        .then<{
            tree: {
                mode: string;
                path: string;
                sha: string;
                type: string;
                url: string;
            }[];
        }>((res) => res.json())
        .then(({ tree }) => {
            const exts = new Set();
            const element = tree
                .map((i) => {
                    set(result, i.path.split("/"), {
                        __path: i.path,
                    });
                    const name = i.path.replace(/^.*[\/]/, "");
                    const ext = name.replace(/^.*[\.]/, "");

                    return {
                        path: i.path,
                        name,
                        ext,
                    };
                })
                .filter((i) => i.name.includes(".") && /^\w+$/.test(i.ext));

            element.forEach((i) => exts.add(i.ext));
            const final = { tree: result, element };
            console.log(final, exts);
            return final;
        });
};
