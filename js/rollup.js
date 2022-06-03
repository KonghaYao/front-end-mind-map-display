import "https://fastly.jsdelivr.net/npm/systemjs@6.12.1/dist/system.min.js";
import { Compiler, sky_module } from "rollup-web/dist/index.js";
import { babelCore as babel } from "rollup-web/dist/plugins/babel.core.js";
import { css } from "rollup-web/dist/plugins/css.js";
import json from "@rollup/plugin-json";
import typescript from "https://esm.sh/@babel/preset-typescript";

const isDev = () => globalThis.location.host.split(":")[0] === "127.0.0.1";
const CDN = isDev()
    ? globalThis.location.origin + "/"
    : "https://fastly.jsdelivr.net/gh/konghayao/front-end-mind-map-display/";

// Solid-js 配置
import SolidPresets from "https://esm.sh/babel-preset-solid@1.3.13";
const RollupConfig = {
    plugins: [
        json(),
        babel({
            babelrc: {
                presets: [
                    SolidPresets,
                    [
                        typescript,
                        {
                            // 需要使用这种方式兼容 solid 配置
                            isTSX: true,
                            allExtensions: true,
                        },
                    ],
                ],
            },
            extensions: [".tsx", ".ts", ""],
            log(id) {
                // console.log("%cbabel ==> " + id, "color:blue");
            },
        }),
        sky_module({
            cdn: "https://cdn.skypack.dev/",
            rename: {
                colorthief: "colorthief@2.3.2/dist/color-thief.mjs",
                "solid-js": "solid-js@1.4.2",
                "solid-js/web": "solid-js@1.4.2/web",
                "solid-js/store": "solid-js@1.4.2/store",
                "assemblyscript/dist/asc": "assemblyscript/dist/asc.js",
            },
        }),
        css(),
    ],
};

const compiler = new Compiler(RollupConfig, {
    // 用于为相对地址添加绝对地址
    root: CDN,
    // 为没有后缀名的 url 添加后缀名
    extensions: [".tsx", ".ts", ".js", ".json", ".css"],

    useDataCache: {
        ignore: isDev ? ["**"].map((i) => CDN + i) : [],
        maxAge: 24 * 60 * 60,
    },
    extraBundle: [],
});

// 开始执行打包操作
console.time("初次打包时间");
await compiler.evaluate("./src/index.tsx");
console.timeEnd("初次打包时间");
// 去除等候页面
globalThis.PrepareDestroy();
