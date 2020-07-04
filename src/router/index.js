import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// 解决重复点击导航路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/userTable',
                    component: () => import(/* webpackChunkName: "userTable" */ '../components/page/UserTable.vue'),
                    meta: { title: '用户管理', permission: true }
                },
                {
                    path: '/newsTable',
                    component: () => import(/* webpackChunkName: "newsTable" */ '../components/page/NewsTable.vue'),
                    meta: { title: '新闻管理' }
                },
                {
                    path: '/productsTable',
                    component: () => import(/* webpackChunkName: "productsTable" */ '../components/page/ProductsTable.vue'),
                    meta: { title: '产品信息管理' }
                },
                {
                    path: '/offersTable',
                    component: () => import(/* webpackChunkName: "offersTable" */ '../components/page/OffersTable.vue'),
                    meta: { title: '招聘信息管理' }
                },
                {
                    path: '/infoTable',
                    component: () => import(/* webpackChunkName: "infoTable" */ '../components/page/InfoTable.vue'),
                    meta: { title: '企业信息管理' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
