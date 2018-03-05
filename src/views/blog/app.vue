<template>
	<div class="page-group">
		<div class="page page-current">
			<!-- 标题栏 -->
			<!--<header class="bar bar-nav">
				<a class="my_arr" @click="goback"></a>
				<h1 class="title my_tit">{{title}}</h1>
				<a class="pull-right share_weixin share_fri" @click="share" style="line-height: 2.2rem;" data-eveId="详情页" data-label='点击"邀请好友"按钮' data-userid="appsId" v-if="yq_kg">邀请好友</a>
			</header>-->
			
    			<router-view ></router-view>
			
			
			

		</div>
	</div>

</template>

<script>
	import * as variables from "../../assets/js/common/variables.js";
	export default {
		beforeCreate: function() {

		},
		created() {

		},
		data() {
			return {
					
			}
		},
		components: {

		},
		//computed:  mapGetters(['allProductList']),
		computed: {
			path: function() {
				return this.$route.path
			},
			title: function() {
				if(this.path == "/") {
					return "加入好司机"
				} /*else if(this.path == "/zjb") {
					return "战绩榜"
				} else if(this.path == "/revalation") {
					return "详细规则"
				}else if(this.path == "/awa_rec") {
					return "抽奖记录"
				}else if(this.path == "/draw_roll") {
					return "抽奖"
				}*/
			},
			yq_kg:function () {
				if(this.path == "/awa_rec"){
					return false
				}else{
					return true
				}
			}

		},
		watch: {

		},
		mounted() {
			$(".load_img").css("display", "none")
		},
		methods: {
			goback: function() {
				if(this.path == "/") {
					console.log("dfd")
					window.location.href = "back://";
				} else if(this.path == "/zjb") {
					this.$router.push("/")
				} else if(this.path == "/revalation") {
					this.$router.push("/")
				}else if(this.path == "/awa_rec") {
					history.back();
				}else if(this.path == "/draw_roll") {
					this.$router.push("/")
				}
			}
			
		}
	}
</script>

<style>
	
</style>