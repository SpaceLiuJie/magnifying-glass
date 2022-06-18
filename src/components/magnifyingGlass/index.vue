<template>
  <div class="magnifier" :style="{ width }">
    <div class="magnifier">
      <div
        class="middle-warp"
        ref="ref"
        @mousemove="move"
        @mouseover="isShow = true"
        @mouseleave="isShow = false"
      >
        <img :src="imgsrc" class="middle-pic" alt="" />
        <!-- 大图容器 -->
        <div class="big" v-show="isShow">
          <img
            class="bigpic"
            :style="{
              marginLeft: bigPos.marginLeft + 'px',
              marginTop: bigPos.marginTop + 'px',
            }"
            :src="imgsrc"
            alt=""
          />
        </div>
        <div
          class="mark"
          v-show="isShow"
          :style="{ top: markPos.top + 'px', left: markPos.left + 'px' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MagnifyingGlass",
  props: ["width", "imgsrc"],
  data() {
    return {
      isShow: false, // 控制放大镜显示隐藏
      // 透明块样式
      markPos: {
        left: 0,
        top: 0,
      },
      // 大图片样式
      bigPos: {
        marginTop: 0,
        marginLeft: 0,
      },
    };
  },
  methods: {
    move(e) {
      // 获取可视页面距离屏幕顶部的距离
      let st = document.body.scrollTop || document.documentElement.scrollTop;
      // 获取鼠标移入的dom元素
      let middle = this.$refs.ref;
      // 获取元素到浏览器顶部距离
      let ot = middle.offsetTop;
      // 获取元素到浏览器左边距距离
      let lt = middle.offsetLeft;
      // 获取鼠标移动的左边
      console.log(e.clientX, lt);
      console.log();
      let x = e.clientX - lt;
      let y = e.clientY - ot + st;
      //计算鼠标在middle元素上移动的坐标
      //找边界条件修改样式
      x = x < 100 ? 100 : x;
      x = x > 400 ? 400 : x;
      y = y < 100 ? 100 : y;
      y = y > 400 ? 400 : y;
      this.markPos = {
        top: y - 100,
        left: x - 100,
      };
      this.bigPos = {
        marginTop: -2 * y + 150,
        marginLeft: -2 * x + 100,
      };
      console.log(1);
    },
  },
};
</script>

<style lang='scss' scoped>
.magnifier {
  margin: 100px auto;
  //   width: 500px;
  .middle-warp {
    width: 100%;
    position: relative;
    .middle-pic {
      width: 100%;
    }
    .mark {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      height: 200px;
      background-color: rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
    .big {
      position: absolute;
      left: 500px;
      top: 0px;
      width: 400px;
      height: 400px;
      overflow: hidden;
      .bigpic {
        width: 1000px;
      }
    }
  }
}
</style>