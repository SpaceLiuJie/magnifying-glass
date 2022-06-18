<template>
  <div class="search">
    <shop-item v-for="item in shopList" :key="item.Id" :shop="item" @onShopClick="linkDetail" />
  </div>
</template>

<script>
import {searchShopList} from '../../api/search.js'

export default {
  name:"Search",
  data(){
    return {
      shopList:[]
    }
  },
  methods: {
    getSearchShopList(){
      let word = this.$route.query.keyword
      searchShopList(word).then((data) => {
        this.shopList = data
        console.log(this.shopList);
        console.log('搜索运行1234');
      })
    },
    linkDetail(e,shop){
      this.$router.push(`/detail/${shop.Id}/${shop.type_one}`)
    }
  },
  created(){
    this.getSearchShopList()
  },
  watch:{
    "$route": {
      deep:true,
      handler(){
        this.getSearchShopList();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
    width: 80%;
    margin: 15px auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
}
</style>
