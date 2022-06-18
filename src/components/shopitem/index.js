import ShopItem from './Shopitem.vue';
import VueLazy from 'vue-lazyload';
import loading from './loading.jpg'


export default {
    install(Vue){
        Vue.use(VueLazy,{
            loading, //预处理图片地址
        })
        // Vue.use(VueLazy,{
        //     loading: 'https://www.keaidian.com/uploads/allimg/190424/24110307_8.jpg', //
        // })
        // 注册全局组件
        // ShopItem.name 获取ShopItem.vue中
        console.log('222');
        Vue.component(ShopItem.name,ShopItem)
    }
}