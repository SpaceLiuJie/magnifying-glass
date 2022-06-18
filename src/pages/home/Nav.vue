<template>
  <nav ref="nav">
		<div class="nav">
            <!--
				 搜索 
				 todo: 优化 变为公共组件
			-->
			<div>
				<div class="logo"><img src="../assets/images/logo.png"></div>
				<div class="search" ref="search">
					<input type="text" id="search" placeholder="请输入想要的商品" v-model="keyword">
					<input type="submit" value="搜索" @click="linkSearch">
				</div>
			</div>
            <!-- 导航 -->
			<ul>
				<li>
					<router-link to="home">首页</router-link>
				</li>
				<li>
					<!-- <router-link to="shopping">购物车</router-link> -->
					<router-link to="login">登录</router-link>
				</li>
				<li>
					<!-- <a>退出登录</a> -->
					<router-link to="register">注册</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
export default {
    name: 'Nav',
	data() {
		return {
			keyword:''
		}
	},
	methods: {
		linkSearch(){
			console.log('saaaaa');
			// this.$router.push('/search?keyword='+keyword)
			
		}
	}
}
</script>

<style>

</style>