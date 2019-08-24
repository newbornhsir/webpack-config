import $ from 'jquery';
$('body').append('<div>hello, world</div>');
/**
 * 异步加载的模块自动被分割, 注释可以指定打包后的名称
 */
const f = () => import(/* webpackChunkName: "testAsync" */ /* webpackPrefetch: true */'./module');
f();