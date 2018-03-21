<template>
	<div id="">

		
		<div class="listBox" v-for="item in content">
			<h1>{{item.title}}</h1>
			<p class="colDefault">
				作者：<span class="colInfo">{{item.users.username}}</span> - 阅读：
				<span class="colInfo">{{item.views}}</span> - 评论：
				<span class="colInfo">{{item.comments.length}}</span>
			</p>
			<dfn><p>{{item.content}}</p></dfn>
			<router-link to="/view">
				<div class="function">
					<a href="">阅读全文</a>
				</div>
			</router-link>

		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import * as variables from "../../assets/js/common/variables.js";
	export default {
		beforeCreate: function() {

		},
		created() {
			console.log("dfdfdf")

			this.content = this.$route.query
			console.log(this.content)
		},
		data() {
			return {
				content: []
			}
		},
		components: {

		},
		methods: {

		},
		watch: {

		},
		mounted() {

		},
		computed: {

		}
	}
</script>

<style>

</style>