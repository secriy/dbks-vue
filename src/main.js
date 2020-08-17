import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import './components/directives';
import 'babel-polyfill';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'default-passive-events';

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 企业网站管理系统`;
    const role = sessionStorage.getItem('auth');

    // 判断管理员权限
    //   if (!role && to.path !== '/login') {
    //       next('/login');
    //   } else
    if (to.meta.permission) {
        // 如果是管理员权限则可进入
        role === 'admin' ? next() : next('/403');
    } else {
        next();
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
