const successSet = new Set<string>();
export const loadScript = async (
    url: string,
    attr: any = {},
    to = document.body
) => {
    if (successSet.has(url)) return true;
    return new Promise<boolean>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        Object.entries(attr).forEach(([key, value]) => {
            script.setAttribute(key, value as string);
        });
        script.onload = () => {
            successSet.add(url);
            resolve(true);
        };
        script.onerror = (e) => {
            reject(e);
        };
        to.appendChild(script);
    });
};
export const loadLink = (url: string) => {
    if (successSet.has(url)) return true;
    return new Promise((resolve, reject) => {
        const script = document.createElement("link");
        script.href = url;
        script.rel = "stylesheet";
        script.onload = () => {
            successSet.add(url);
            resolve(true);
        };
        script.onerror = (e) => {
            reject(e);
        };
        document.head.appendChild(script);
    });
};

/**
 * 避免  `import 'url'; ` 被重复执行的问题
 *
 */
export const loadEsmPackage = (url: string) => {
    if (successSet.has(url)) return;
    return import(url).then((res) => {});
};
/**  批量不重复 esm 代码执行 */
export const loadEsmPackages = (...args: string[]) => {
    return Promise.all(args.map((i) => loadEsmPackage(i)));
};
