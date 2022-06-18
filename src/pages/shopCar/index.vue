<template>
  <div class="shopCar">
    <div class="shop">
      <div class="carHeader">
        <input type="checkbox" v-model="isAll" @change="changeAll" />
        <span class="all">全选</span>
        <span class="name">商品详情</span>
        <span class="pri">单价</span>
        <span class="number">数量</span>
        <span class="price">总格</span>
        <span class="handle">操作</span>
      </div>
      <div class="carMain" v-for="item in carList" :key="item.Id">
        <div class="mainItem">
          <input
            class="done"
            :value="item"
            v-model="checkeds"
            type="checkbox"
          />
          <img :src="item.img_list_url" alt="" />
          <span class="name">{{ item.title }}</span>
          <span class="pri">{{ item.price }}</span>
          <div class="num">
            <button @click="reduce(item.Id)">-</button>
            <span>{{ item.count }}</span>
            <button @click="add(item.Id)">+</button>
          </div>
          <span class="price">{{ item.count * item.price }}</span>
          <el-button type="info" round class="dele" @click="deletCar(item.Id)"
            >删除</el-button
          >
        </div>
      </div>
      <h1 v-if="carList.length == 0">没有更多商品</h1>

      <div class="carFooter">
        <input type="checkbox" @change="changeAll" v-model="isAll"/>
        <span class="all" >全选</span>
        <span class="delect">全部删除</span>
        <span class="add">总价：￥{{ totalPrice }}</span>
        <el-button type="danger" round class="dele">结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import a from "../../assets/images/qiche.gif"
import { getShopCarList, deletCar} from '../../api/shopcar.js'
import { addShopCar , reduceShopCar } from '../../api/detail'
import { _debounce } from "../../components/double.js";

export default {
  name: "ShopCar",
  data() {
    return {
      shopList: [{ id: "1", title: "面包", price: "32", done: false }],
      carList: [], // 购物车列表数据
      src: a,
      flag: true, // 做开关,防止多次点击加
      checkeds: [], // 存放多选的列表
      totalPrice: 0,
      isAll: false, // 是否全选
    };
  },
  methods: {
    add(goodId) {
      if (this.flag) {
        this.flag = false;
        console.log(goodId,"goodid");
        let { token, username } = this.$store.state.user;
        addShopCar({ token, username, goodId }).then((data) => {
          console.log("获取成功");
          this.flag = true;
          // 重新获取购物车列表
          this.getShopCarList();
        });
      }

      // let handle =  () => {
      //   console.log('111f1');
      //   // let { token, username } = this.$store.state.user;
      //   // addShopCar({token,username}).then((data) => {
      //   //   console.log("获取成功");
      //   // });
      // };
      // _debounce(handle, 2000)();
      // let handle = _debounce(addShopCar, 2000);
      // handle.bind(this)({token,username});
    },
    // 减少商品数量
    reduce(goodId) {
      if (this.flag) {
        this.flag = false;
         let { token, username } = this.$store.state.user;
         reduceShopCar({ token, username, goodId }).then((data) => {
          console.log("商品撤销成功");
          this.flag = true;
          // 重新获取购物车列表
          this.getShopCarList();
        });
        
      }
    },
    // add:_debounce(addShopCar,2000),
    // 发送获取购物车列表请i去
    getShopCarList() {
      let { token, username } = this.$store.state.user;
      getShopCarList({ token, username }).then((result) => {
        // console.log('获取购物车咧白哦 success');
        console.log('123456');
        this.carList = result;
        this.checkeds = this.carList;
        // this.changeAll()
      });
    },
    changeAll() {
      if (this.isAll) {
        this.checkeds = this.carList;
      } else {
        this.checkeds = [];
      }
    },
    // 删除列表
    deletCar(goodId) {
      this.$confirm("将永久删除购物车傻瓜品?, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let { token, username } = this.$store.state.user;
          deletCar({ token, username, goodId }).then((data) => {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            // 删除列表后,页面需要重新加载.所以重新获取购物车列表
            this.getShopCarList();
           
          });
        })
        .catch(() => {
          this.$message({
            message: "取消删除操作",
            type: "info",
          });
        });
    },
  },
  created() {
    // 初始化加载组件获取购物车列表
    this.getShopCarList();
    console.log(this.totalPrice);
  },
  /**
   * computed 计算属性
   * 值:是对象
   * key都是geterr 函数, getter函数特点:每个函数都有return
   * 注意：key 不是函数,key的作用:是保存geterr函数的返回值
   * getter函数执行条件.
   * 1:当使用 key,多次使用key,getter函数执行一次
   * 2:getter函数中依赖的数据发生变化,重新执行.
   */
  // computed: {
  //   totalPrice(){
  //     let res = 0;
  //     this.checkeds.forEach((item)=>{
  //        res += parseInt(item.count)*parseFloat(item.price)
  //     })
  //     return res
  //   }
  // },

  /**
   * watch 监听属性,监听所有响应式数据,当响应式数据变化handler函数执行
   * 赋值:对象
   * key　被监听的响应式数据，
   * value : object | function
   *        function 就是 handler函数
   *         object 有两个属性
   *            deep 表示是否深度监听 true 深度监听 false 不深度监听
   *            handler 函数.当监听的数据发生变化执行.
   */
  watch: {
    checkeds: {
      deep: true, // 对象数组,深度监听
      handler(val) {
        let res = 0;
        // 求总价钱
        val.forEach((item) => {
          res += item.count * item.price;
        });
        this.totalPrice = res;
        console.log(val,'val');
        // 更具用户选中列表项,判断选否需要选中全选.
        if (val.length === this.carList.length) {
          this.isAll = true;
        } else {
          this.isAll = false;
        }
      },
    },
    // getShopCarList()
  },
};
</script
</script>

<style lang="scss" scoped>
.shopCar {
  width: 100vw;
  min-height: 100vh;
  background-color: #e8e4e4;
  padding-top: 50px;
}
.shop {
  font-size: 18px;
  width: 1200px;
  margin: 0 auto;
  border-radius: 50px;
  background-color: #fff;
}
.carHeader {
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: left;
  border-bottom: 1px solid #000;
  input {
    margin-left: 5%;
  }
  .all {
    margin-left: 1%;
  }
  .name {
    margin-left: 16%;
  }
  .pri {
    margin-left: 16%;
  }
  .price {
    margin-left: 10%;
  }
  .number {
    margin-left: 10%;
  }
  .handle {
    margin-left: 11%;
  }
}
.carMain {
  background-color: #f5f5f5;
  margin-top: 10px;
  margin-bottom: 90px;
  border-radius: 50px;
  width: 100%;
  text-align: left;
  height: 100px;
  line-height: 100px;

  img {
    width: 8%;
    height: 8%;
    vertical-align: middle;
    margin-left: 5%;
  }
  .dele {
    width: 80px;
    height: 50px;
    margin-left: 8%;
  }
  .mainItem {
    width: 100%;
    .done {
      margin-left: 5%;
    }
    .pri {
      display: inline-block;
      width: 100px;
      margin-left: 5%;
      // background-color: red;
      text-align: center;
    }
    .name {
      width: 20%;
      // background-color: red;
      margin-left: 1%;
      display: inline-block;
      text-align: center;
    }
    .num {
      display: inline-block;
      margin-left: 5%;
      button {
        width: 30px;
        height: 30px;
      }
      span {
        display: inline-block;
        text-align: center;
        width: 30px;
        height: 30px;
      }
    }
    .price {
      display: inline-block;
      width: 100px;
      margin-left: 5%;
      // background-color: red;
      text-align: center;
    }
  }
}
.carFooter {
  width: 80%;
  height: 80px;
  border-top: 1px solid #000;
  line-height: 80px;
  text-align: left;
  position: fixed;
  bottom: 0;
  background: #fff;
  .delect {
    display: inline-block;
    width: 80px;
    // background-color: red;
    text-align: center;
    margin-left: 5%;
  }
  input {
    margin-left: 5%;
  }
  .all {
    margin-left: 1%;
  }
  .dele {
    width: 80px;
    height: 50px;
    margin-left: 4%;
  }
  .add {
    margin-left: 45%;
    width: 200px;
    display: inline-block;
    // background-color: red;
    text-align: center;
  }
}
</style>