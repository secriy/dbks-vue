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
            redirect: '/info'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/userTable',
                    component: () => import(/* webpackChunkName: "userTable" */ '../views/UserTable.vue'),
                    meta: { title: '用户管理', permission: true }
                },
                {
                    path: '/newsTable',
                    component: () => import(/* webpackChunkName: "newsTable" */ '../views/NewsTable.vue'),
                    meta: { title: '新闻管理' }
                },
                {
                    path: '/productsTable',
                    component: () => import(/* webpackChunkName: "productsTable" */ '../views/ProductsTable.vue'),
                    meta: { title: '产品宣传管理' }
                },
                {
                    path: '/offersTable',
                    component: () => import(/* webpackChunkName: "offersTable" */ '../views/OffersTable.vue'),
                    meta: { title: '企业招聘管理' }
                },
                {
                    path: '/infoTable',
                    component: () => import(/* webpackChunkName: "infoTable" */ '../views/InfoTable.vue'),
                    meta: { title: '企业信息管理' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/info',
            component: () => import(/* webpackChunkName: "info" */ '../views/show/Info.vue'),
            meta: { title: '企业信息' }
        },
        {
            path: '/new',
            component: () => import(/* webpackChunkName: "new" */ '../views/show/New.vue'),
            meta: { title: '企业新闻' }
        },
        {
            path: '/offer',
            component: () => import(/* webpackChunkName: "offer" */ '../views/show/Offer.vue'),
            meta: { title: '企业招聘' }
        },
        {
            path: '/product',
            component: () => import(/* webpackChunkName: "product" */ '../views/show/Product.vue'),
            meta: { title: '产品宣传' }
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
