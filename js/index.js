import "./env.js";
import process from "https://esm.sh/process/browser.js";
globalThis.process = process;
// 使用这种方式来保证加载顺序
await import("./rollup.js");
