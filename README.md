# Demo-Page

## 什么是 Demo-Page

DemoPage 是我用于收集可以使用的 NPM 插件的网站，我利用这个网站将众多的插件示例收集在这里，并使用展示，你可以在网站中直接看到源代码和运行结果！

> 如现在的官网是使用我的 **浏览器端打包器 [Rollup-Web](https://gitee.com/dongzhongzhidong/rollup-web)** 进行浏览器打包的，这个 Markdown 文件将会渲染到首页的一个文件中！

[首页](https://konghayao-demo-page.netlify.app/)

## Demo-Page 的项目结构

1. Demo-Page 采用 Solid 作为前端架构配合 rollup-web 进行浏览器端打包

2. 项目中的代码完全是使用现代的 JS 技术进行编写的，采用 tsx 分文件的形式编写示例代码

3. 项目中使用 rollup-web 进行打包，后端没有打包过，所以项目只需要发布 index.html 即可

4. 我使用了 Netlify 的免费网站部署，其利用 http2 能够很好地承载多文件下载

5. src/pages 下的 tsx 文件都是示例文件，为插件的使用示例，在网站中你也可以直接点击源代码按钮查看

6. 我采用生成 json 文件的方式提取 src/pages/ 下的 tsx 文件，抽离 description 导出，构建项目的索引（`pnpm make` 生成 json 文件）

7. 在前端打包过程中，产生出了项目的代码文件和依赖关系，所以在网页中你可以看到每个 Demo-Page 的代码和依赖关系图

## Demo-Page 的意义

1. Demo-Page 作为一个测试浏览器作为打包环境的测试项目，很好地向我证明了在浏览器端配合 CDN 打包本地代码的可能性

2. 浏览器打包使得我们前端开源项目并不需要进行服务器或本地的打包操作，直接开一个页面，自动就被打包了

3. 通过我对 rollup-web 的异步文件缓存优化，开发效率如同 vite

4. 当然 vite 需要 Nodejs 环境打包支持，Demo-Page 没有经过 Nodejs 环境的打包！

## License

Apache-2.0
