import ManigyingGlass from './index.vue'

// todo 组件过多，最好统一注册
export default {
    install(Vue) {
        Vue.component(ManigyingGlass.name,ManigyingGlass)
    }
}