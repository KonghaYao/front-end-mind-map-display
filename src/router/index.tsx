import {
    Component,
    createSignal,
    onCleanup,
    onMount,
    Show,
    Suspense,
} from "solid-js";
import Navigo, { Match } from "navigo";
import { JSX } from "solid-js";
export const router = new Navigo("/", {
    hash: true,
});

export const routerHelper = {
    history: [] as string[],
    back() {
        const route = this.history.pop();
        if (route) {
            router.navigate(route);
            console.log(routerHelper.history);
            return true;
        }
        return false;
    },
};

/** 路由跳转组件 */
export const Link: Component<{ href: string }> = (props) => {
    const jumpTo = () => {
        router.navigate(props.href);
    };
    return (
        <a onclick={jumpTo}>
            <Suspense fallback={<p>Loading...</p>}>{props.children}</Suspense>
        </a>
    );
};

/** 路由显示组件 */
export const Route = (props: {
    path: string;
    element: Component<any> | JSX.Element;
}) => {
    const [matched, setMatched] = createSignal<Match | false>(false);
    /** 路由跳转的回调函数 */
    const cb = () => {};
    router.on(props.path, cb, {
        async before(next, match) {
            next();
            setMatched(match);
        },
        leave(done, match) {
            setMatched(false);
            done();
        },
    });

    onMount(() => {
        /** 必须在路由绑定之后再 match 才能 match 到 */
        const isCurrent = router.matchLocation(props.path) as Match;
        setMatched(isCurrent);
    });
    onCleanup(() => {
        router.off(cb);
    });
    const Inner = props.element as Component<any>;
    return (
        <Show when={matched()}>
            {(match) => {
                return <Inner match={match}></Inner>;
            }}
        </Show>
    );
};
