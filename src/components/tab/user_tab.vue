<template>
	<div>
		<table class="table table-hover table-striped">

			<tr>
				<th v-for="item in data.title">{{item}}</th>
				
			</tr>

			<tr v-for="item in content">
				<td>{{item._id}}</td>
				<td>{{item.username}}</td>
				<td>{{item.password}}</td>
				<td>{{item.isAdmin?"是":"不是"}}</td>
			</tr>

		</table>
		<ul class="pager">
			<li class="previous">
				<a  @click="prev" style="cursor: pointer;">&larr; 上一页</a>
			</li>

			<li>
				一共有 条数据，每页显示 条数据，一共 页，当前第 页
			</li>

			<li class="next">
				<a  @click="nexts" style="cursor: pointer;">下一页 &rarr;</a>
			</li>
		</ul>
	</div>

</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import * as variables from "../../assets/js/common/variables.js";
	export default {
		beforeCreate: function() {

		},
		created() {

		},
		data() {
			return {
				content: [],
//				请求第几页
				page:1,
//				总数量
				totsize:"",
//				每页展示条数
				size:3
				
			}
		},
		components: {

		},
		methods: {
			ajax: function(url) {
				
				var that = this;
				utils.my_ajax({
					type: "post",
					url: url,
					data:{
						size:that.size,
						page:that.page
					},
					sucesscallback(res) {
						if(res.code = "00") {
							that.totsize=res.result.totsize
							that.content = res.result.user_ifo
						}
					}
				})
			},
			prev:function  () {
				console.log("dfdf")
				var tot_page=Math.ceil(this.totsize/this.size);
				if(this.page<=1) return ;
				this.page--;
				
				this.ajax(this.data.url)
			},
			nexts:function () {
				
				var tot_page=Math.ceil(this.totsize/this.size);
				if(this.page>=tot_page)return ;
				this.page++;
				
				this.ajax(this.data.url)
			}
		},
		watch: {
			data: function() {
				this.page=1;
				
				this.ajax(this.data.url)
			}
		},
		mounted() {
			console.log(this.data)
		},
		computed: {

		},
		props: ["data"]
	}
</script>

<style>

</style>