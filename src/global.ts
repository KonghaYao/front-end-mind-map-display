/** 配置 CDN 选项，如果使用 CDN 的话 */
export const isDev = () =>
    globalThis.location.host.split(":")[0] === "127.0.0.1";
/* 项目文件的 CDN 目录 */
export const CDN = isDev()
    ? globalThis.location.href.split("#")[0]
    : "https://fastly.jsdelivr.net/gh/konghayao/Demo-Page/index.html";

// NPM 插件 CDN 的根
export const NPM = "https://fastly.jsdelivr.net/npm/";
export const GH = "https://fastly.jsdelivr.net/gh/";
