<template>
    <div>
        <h1>home页面</h1>
        <button v-for="item in 5" :key="item" @click="$router.push('/home/' + 'item')">按钮{{item}}</button>
    </div>
</template>

<script>
export default {
    name: "Home",
    beforeRouterUpdate(to, from, next) {
        console.log(' 组件内中  beforeRouterUpdate')
        next()
    },
    beforeRouterEnter(to, from, next) {
        console.log('组件内中 beforeRouterEnte');
        next()
    },
    beforeRouterLeave(to, from, next) {
        console.log('组件内中 beforeRouterLeave');
        next()
    },

}
</script>