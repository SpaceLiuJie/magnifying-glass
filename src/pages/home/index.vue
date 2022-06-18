<template>
  <div class="home">
    <div class="swiper">
      <!-- 
        todo: 提取公共组件：element-swiper二次封装
       -->
      <el-carousel indicator-position="outside" type="card" @change="carouselChange" height="350px" class="carousel">
        <el-carousel-item v-for="(src, index) in imgs" :key="index">
          <img :src="src" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 商品列表渲染 -->
    <div class="list">
      <shop-item 
      @onShopClick="linkDetail"
      v-for="(item, index) in shopList" :key="index" :shop="item" :imgHeight="'275px'"></shop-item>
    </div>
    <back-top />
  </div>
</template>
<script>
// import '../../api/home.js'
// import "api/home.js";
// import "@/api/home.js";
import a from "@images/百度.jpg";
import b from "@images/新浪.jpg";
import c from "@images/腾讯.jpg";
import d from "@images/雅虎.jpg";

import { getShopList } from "api/home.js";
let isButton = true; // 控制是否到底 true  到底  false没到

export default {
  name: "Home",
  data() {
    return {
      // bug
      // imgs:['../../assets/images/a.jpg']
      // good
      imgs: [a, b, c, d],
      shopList: [],
      page: 1, // 表示第几页数据
    };
  },
  methods: {
    carouselChange() {
      console.log("aaaaa");
    },
    // 获取商品列表
    getShopList() {
      return getShopList(this.page).then((data) => {
        this.shopList = this.shopList.concat(data);
      });
    },
    scrollHandle() {
      console.log('scroll handel');
      // 页面高度
      let pageH = getComputedStyle(document.querySelector("#app"))["height"];
      pageH = parseInt(pageH);
      // 视图窗口高度
      let h = innerHeight;
      // 滚动条滚动高度
      let H = document.documentElement.scrollTop || document.body.scrollTop;
      // 找到到底条件
      if (h + H > pageH - 10 && isButton) {
        isButton = false;
        // 到底了
        // 获取下一页数据
        this.page++;
        this.getShopList().then(() => {
          isButton = true;
        });
      }
    },
    linkDetail(e,item){
      this.$router.push(`/detail/${item.Id}/${item.type_one}`);
    }
  },
  created() {
    // bug
    // localhost:8080//api/goodList
    // good
    // http://192.168.205.36:9528/api/goodList
    this.getShopList();
  },
  // 滚动加载更多
  mounted() {
    // todo：优化封装为独立插件。并使用防抖节流。
     console.log('destory run');
    window.addEventListener("scroll", this.scrollHandle);
  },
  beforeDestroy() {
    console.log('destory run');
    window.removeEventListener("scroll", this.scrollHandle);

  },
};
</script>

<style scoped lang="scss">
.home {
  width: 80%;
  margin: 10px auto;
  padding: 15px 0px;

  el-carousel {
    el-carousel-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>