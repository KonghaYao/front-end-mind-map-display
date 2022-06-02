// 当用户返回的时候刷新页面
window.location.host.split(":")[0] === "127.0.0.1" &&
    document.addEventListener("visibilitychange", function () {
        console.log(document.visibilityState);
        if (document.visibilityState === "visible") {
            globalThis.location.reload();
        }
    });

// 首页白屏的处理
import { html, render } from "https://cdn.skypack.dev/lit-html";
const prepare = () =>
    // 来自 https://gitee.com/k21vin/front-end-data-visualization/blob/master/src/views/Native/PureCSS/pages/Loading/components/L71.vue
    html`<div
        style="position:absolute;top:0;left:0;z-index:1000; display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;width:100vw"
    >
        <div class="com__box">
            <!-- loading -->
            <div class="loading">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
                <div class="shape shape-4"></div>
            </div>
        </div>
        <div style="margin:1rem 0;color:green">代码加载中，请稍等...</div>

        <style>
            .loading {
                width: 3rem;
                height: 3rem;
                position: relative;
                transform: rotate(45deg);
            }

            .shape {
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 1px;
                position: absolute;
            }

            .shape-1 {
                background-color: #1875e5;
                left: 0;
                animation: animationShape1 2s ease infinite;
            }

            .shape-2 {
                background-color: #c5523f;
                right: 0;
                animation: animationShape2 2s ease infinite;
            }

            .shape-3 {
                background-color: #499255;
                bottom: 0;
                animation: animationShape3 2s ease infinite;
            }

            .shape-4 {
                background-color: #f2b736;
                right: 0;
                bottom: 0;
                animation: animationShape4 2s ease infinite;
            }

            @keyframes animationShape1 {
                0% {
                    transform: translate(0);
                }

                25% {
                    transform: translateX(100%);
                }

                50% {
                    transform: translate(100%, 100%);
                }

                75% {
                    transform: translate(0, 100%);
                }

                100% {
                    transform: translateX(0);
                }
            }

            @keyframes animationShape2 {
                0% {
                    transform: translate(0);
                }

                25% {
                    transform: translateY(100%);
                }

                50% {
                    transform: translate(-100%, 100%);
                }

                75% {
                    transform: translate(-100%, 0);
                }

                100% {
                    transform: translate(0);
                }
            }

            @keyframes animationShape3 {
                0% {
                    transform: translate(0);
                }

                25% {
                    transform: translateY(-100%);
                }

                50% {
                    transform: translate(100%, -100%);
                }

                75% {
                    transform: translate(100%, 0);
                }

                100% {
                    transform: translate(0);
                }
            }

            @keyframes animationShape4 {
                0% {
                    transform: translate(0);
                }

                25% {
                    transform: translateX(-100%);
                }

                50% {
                    transform: translate(-100%, -100%);
                }

                75% {
                    transform: translate(0, -100%);
                }

                100% {
                    transform: translate(0);
                }
            }
        </style>
    </div>`;

// This renders <div>Hello Steve!</div> to the document body
const wrapper = document.createElement("div");
render(prepare(), wrapper);
document.body.appendChild(wrapper);
globalThis.PrepareDestroy = () => {
    wrapper.remove();
};
