import router from "./router/index.js"
import NgProgress from 'nprogress ';
import 'nprogress/nprogress.css' // progress bar style
import store from './store'
/**
*路由导航守卫全局守卫* 
1:没有token
*2:有token过期或者无效*/
router.beforeEach((to, from, next) => {
    // frome. ..to从哪个地址到哪个地址
    let token = store.user.token
    NgProgress.start()
    // if (!token) {
    //     if (to.path == '/login') {
    //         next(`${to.path}?redirect = ${from.path}`)
    //     } else {
    //         next('/login')
    //     }
    // } else {
    //     next();
    // }
    next();

})