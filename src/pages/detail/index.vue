<template>
  <div class="detail">
    <el-button type="success" @click="$router.back()">返回</el-button>
    <div class="item">
      <magnifying-glass :imgsrc="shop.img_list_url" :width="'500px'" />
      <div class="dec">
        <p class="title">{{ shop.title }}</p>
        <p>{{ shop.price }}</p>
        <el-button type="danger" @click="addShopCar(shop.Id)">加入购物车</el-button>
      </div>
    </div>
    <h1>相关商品展示</h1>
    <div class="list">
      <shop-item @onShopClick="replaceLink" v-for="item in shopList" :shop="item" :key="item.Id" />
    </div>
  </div>
</template>

<script>
import { getDetail, getShopList, addShopCar } from "../../api/detail.js";
export default {
  name: "Detail",
  data() {
    return {
      shop: {},
      shopList: [],
    };
  },
  methods: {
    getDetail() {
      let id = this.$route.params.id;
      getDetail(id).then((data) => {
        this.shop = data[0];
      });
    },
    getTypeOneShop() {
      let type = this.$route.params.type_one;
      getShopList(type).then((data) => {
        console.log("获取相关商品 success");
        this.shopList = data;
      });
    },
    replaceLink(e, shop) {
      this.$router.replace(`/detail/${shop.Id}/${shop.type_one}`);
    },
    // 点击添加购物车
    addShopCar(goodId) {
      // bad
      // let token = this.$store.state.user.token;
      // let username = this.$store.state.user.username;
      // good
      let { token, username } = this.$store.state.user;

      this.permission(token).then((res) => {
        if (res) {
          let data = {
            goodId,
            token,
            username,
          };
          addShopCar(data).then((data) => {
            if (data.code === 1) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              // 添加购物车成功后其他交互行为
              // todo:返回滚动条滚动位置。
              // todo: 优化首页商品进行缓存
              // this.$router.push('/home')
            }
            if (data.code == 2) {
              this.$message({
                message: "添加失败。联系管理员",
                type: "danger",
              });
            }
          });
        }
      });
    },

    // 权限验证函数
    permission(token) {
      return new Promise((resolve, reject) => {
        if (token) {
          resolve(true);
        }
        // 没有登录
        if (!token) {
          // 提示去登录
          this.$confirm("您还没登录请去登录？？？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              // 点击确认跳转登录页面
              this.$router.push("/login?redirect=" + this.$route.path);
            })
            .catch(() => {
              // 点击取消执行
              this.$message({
                type: "info",
                message: "已经取消",
              });
            });

          resolve(false);
        }
      });
    },
  },
  created() {
    this.getDetail();
    this.getTypeOneShop();
  },
  // 展示上一次渲染的内容
  // beforeRouteUpdate (to,from,next){
  //   console.log('before router updata');
  //   this.getDetail()
  //   this.getTypeOneShop()
  //   next()
  // }

  // // watch 监听是属性
  watch: {
    // 监听路由地址变化
    $route: {
      deep: true, // 深度加你太能干
      handler(to, from) {
        console.log("---------------------watch route----------------");
        console.log(to);
        this.getDetail();
        // this.getTypeOneShop();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  width: 80%;
  margin: 10px auto;
}
.item {
  display: flex;
  position: relative;
  width: 80%;
  .dec {
    position: absolute;
    right: 20%;
    top: 40%;
    .title {
      font-size: 18px;
      font-weight: 900;
    }
  }
}
</style>