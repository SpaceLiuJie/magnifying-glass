<template>
  <div class="shop" @click="shopClickHandle" :style="{width}">
    <div class="div">
        <!-- 
            todo: 优化：提供用户选择填否懒加载。
                       提供自定义预加载图片
         -->
        <img :src="shop.img_list_url" alt="" :style="{height:imgHeight}">
        <!-- <img v-lazy="shop.img_list_url" :style="{height:imgHeight}" alt=""> -->
    </div>
    <div class="title">
        <span>{{shop.title}}</span>
    </div>
    <div class="price">
        <span>{{shop.price}}</span>
        <p v-html="shop.mack"></p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ShopItem',
    /**
     * 预定义自定义属性 shop 
     * 作用：接受组件需要的数据
     */
    props: {
        shop:Object,
        /**
         * 因为：屏幕尺寸不同，每行展示商品数量数量不同，所以宽度是变化的
         * 为了让使用者可以自己设置宽度。
         */
        width:{
            type:String,
            default:'23%'
        },
        imgHeight: {
            type: String,
            default: '175px'
        }
    },
    methods: {
        shopClickHandle(e) {
            /**
             * 预定义自定义事件 onShopClick
             * 提供点击组件行为。
             * 1：事件对象
             * 2：被点击商品数据
             */
            this.$emit('onShopClick',e,this.shop)
        }
    }
}
</script>

<style lang="scss" scoped>
.shop {
    display: inline-block;
    padding: 10px 15px;
    text-align: center;
    font-size: 14px;
    .div>img{
        width: 100%;
    }
    .title {
        font-weight: 900;
    }
    .price {
        display: flex;
        justify-content: space-between;
        &>span {
            font-size: 16px;
            color: #04073c;
        }
    }
}
</style>
