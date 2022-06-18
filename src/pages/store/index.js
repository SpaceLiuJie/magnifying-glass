// import Vue from 'vue'
// import Vuex from 'vuex'
// import { get } from '../utils/localStrage.js'
// Vue.use(Vuex)
// let user = get('user');
// export default new Vuex.Store({
//   // 一般情况 state 下有几个键值对；就有几个 mutation和 action函数
//   // state中某个值 只读,不修改,不需要mution action
//   state: {
//     user,
//   },
//   mutations: {
//     SETUSER(state,data){
//       /**
//        * state 是 vuex中响应式数据
//        * data 执行函数时候传入的实参
//        */
//       state.user = data;
//     }
//   },
//   actions: {
//     setUser(store,data){
//       /**
//        * store 是 vuex实例对象
//        * store.commit() 
//        * 作用:触发mutation中函数
//        * 参一: mutaions中函数名
//        * 参二: 给执行函数传入实参
//        */
//       store.commit('SETUSER',data)
//     }
//   },
//   modules: {
//   }
// })
// /**
//  * 使用vuex 流程
//  * 1:在state中初始化数据, 并创建actionh和mutaion函数
//  * 3: 在组件中 通过this.$store.dispatch 触发 action函数
//  * 4: 在action中 通过 store.comit 触发mution函数
//  * 5: 在mutionh中 通过state.xx 更改数据
//  * ----> 完成修改过程
//  */

