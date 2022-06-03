# 前端脑图

[![Netlify Status](https://api.netlify.com/api/v1/badges/1ad3a363-e88a-47bc-9838-e4dbf7b6c34d/deploy-status)](https://app.netlify.com/sites/front-end-mind-map/deploys)

[前端脑图](https://front-end-mind-map.netlify.app/)

## 简单介绍

前端脑图是 JCodeLife 的 [mind-map](https://github.com/jCodeLife/mind-map) 项目 的线上查看网站。

网站通过 github API 获取仓库树状结构并通过 jsdelivr 获取 JCodeLife 的 [mind-map](https://github.com/jCodeLife/mind-map) 项目中的文件，并在前端进行展示。

网站由 solid-js 构建，使用 rollup-web 在浏览器端直接打包，xmind 的解析使用了一个 xmind 官网的项目改动而来，文件路径和 hash 路由路径有关，所以可以使用 url 引用到你自己的网页中。

网站适配了移动端。

## 已经知道的小问题

1. 第一次打开网页非常慢，大致需要 4-10 秒，但是后面就平均 1 秒可以打开。
2. Markdown 解析可能有点样式问题。
3. 使用了 Web-component 所以部分设备运行不太好。
4. Github API 在 **某些地区** 会访问失败，这个是正常现象 ：）
