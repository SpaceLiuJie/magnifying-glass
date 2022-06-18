<template>
  <div class="backTop">
    <!-- 
      滚动监听的是window ；target不要写，如果是某个元素需要写target
     -->
    <el-backtop
      class="el-backtop"
      :visibility-height="height"
      :right="right"
      :bottom="button"
    >
      <div
        style="
           {
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 30px;
            color: #1989fa;
            font-size: '14px';
          }
        "
      >
        <!-- 为了允许：使用者自定义输入文本内容 -->
        {{text}}
      </div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: "BackTop",
  props: {
    // todo: 如何完胜自定义样式
    // style: {
    //     type: Object,
    //     default() {
    //         return {
    //         }
    //     }
    // },
    height: {
      type: Number,
      default: 300,
    },
    right: Number,
    button: Number,
    text: {
      type: String,
      default: "返回",
    },
  },
};
</script>

<style lang="scss" scoped>
.el-backtop {
  width: 75px;
  height: 75px;
}
</style>
