import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/sass/common.scss'
// import './assets/less/a.less';
//在vue 项目中使用element-ui
import ElementUi from 'element-ui';
// 导入插件
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;
//使用插件
Vue.use(ElementUi);

// 导入自定义全局组价
import ShopItem from './components/shopitem'
Vue.use(ShopItem)
import backTop from './components/backTop/index.js'
Vue.use(backTop)
import ManigyingGlass from './components/magnifyingGlass/index.js'
Vue.use(ManigyingGlass)
/* 
  vue.use()
  参数:Function | object.installFunction形参:是vue构造函数
  object必须要要install函数形参赋值:vue函数
*/

/* 
  vue. use( function(app){ // install函数
    console.log( app);
  })
 */

// vue.use({
//   install(vue) {
//     console.log('obj-------');
//     console.log(vue);
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')