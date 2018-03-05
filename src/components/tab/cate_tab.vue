<template>
	<div>
		<table class="table table-hover table-striped">
           <a @click="tk(0)" class="new_add">新增</a>
			<tr>
				<th v-for="item in data.title">{{item}}</th>
				<th>操作</th>
			</tr>

			<tr v-for="item in content" class="tr">
				<td class="id">{{item._id}}</td>
				<td class="cate_name">{{item.name}}</td>
				<td  > <a @click="change_tk($event)">修改</a> | <a @click="del_tk($event)">删除</a></td>
			</tr>

		</table>
		<ul class="pager">
			<li class="previous">
				<a  @click="prev" style="cursor: pointer;">&larr; 上一页</a>
			</li>

			<li>
				一共有{{totsize}} 条数据，每页显示{{size}} 条数据，一共 {{Math.ceil(this.totsize/this.size)}}页，当前第{{page}} 页
			</li>

			<li class="next">
				<a  @click="nexts" style="cursor: pointer;">下一页 &rarr;</a>
			</li>
		</ul>
		
		<div class="tk" v-if="tk_bol">
			<div @click="close_tk">关闭</div>
			
				名称：<input type="text" value="" id="name" />
				<span>{{tk_tip}}</span>
				<button @click="add_cate" v-if="tk_but=='0'">保存</button>
				<button @click="change_cate" v-if="tk_but=='1'">修改</button>
			
		</div>
		
		<div class="tk" v-if="tk_bol2">
			<div @click="close_tk">关闭</div>
			确认要删除"{{del_texttip}}"类目吗？
			{{tk_tip}}<button @click="del_cat">确认</button>
			<button @click="close_tk">取消</button>
			
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
			
		},
		data() {
			return {
				content: [],
//				请求第几页
				page:1,
//				总数量
				totsize:"",
//				每页展示条数
				size:5,
				tk_bol:false,
				tk_but:"",
				tk_tip:"",
				tk_val:"",
				tk_bol2:false,
				del_texttip:"",
				del_id:""
			}
		},
		components: {

		},
		methods: {
			
			tk:function (text) {
				this.tk_bol=true;this.tk_but=text
			},
			close_tk:function () {
				this.tk_bol=false;
				this.tk_tip="";
				$("#name").val("");
				$("#name").attr("_id","");
				this.tk_bol2=false;
				this.del_texttip="";
				this.del_id="";
			},
			change_tk:function (event) {
				debugger
				var par_tr=$(event.currentTarget).parents(".tr");
				
				this.tk_bol=true;
				this.tk_but=1;
				setTimeout(function(){
					$("#name").val(par_tr.children(".cate_name").text())
				$("#name").attr("_id",par_tr.children(".id").text())
				})
				
			},
			del_tk:function(){
				this.tk_bol2=true;
				var par_tr=$(event.currentTarget).parents(".tr");
				this.del_texttip=par_tr.children(".cate_name").text();
				this.del_id=par_tr.children(".id").text()
			},
			del_cat:function(){
				var that=this;
				utils.my_ajax({
					type: "post",
					url: variables.DELETCATE,
					data:{
						id:this.del_id
					},
					sucesscallback(res) {
						
						if(res.code == "00") {
							that.tk_tip="删除成功";
							var timer=setTimeout(function  () {
								that.page=1;
								that.ajax(that.data.url);
								that.close_tk();
							},800)
						}else {
							that.tk_tip=res.message;
						}
					}
				})
			},
			add_cate:function () {
				var that=this;
				var name=$("#name").val();
				if(!name){
					this.tk_tip="分类名不能为空";return;
				}
				utils.my_ajax({
					type: "post",
					url: variables.ADDCATE,
					data:{
						name:name
					},
					sucesscallback(res) {
						
						if(res.code == "00") {
							that.tk_tip="保存成功";
							var timer=setTimeout(function  () {
								that.page=1;
								that.ajax(that.data.url);
								that.close_tk();
							},800)
						}else if(res.code == "01"){
							that.tk_tip=res.message;
						}
					}
				})
			},
			
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
							that.content = res.result.cate_ifo
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
			},
			change_cate:function  () {
				
				
				var that=this;
				utils.my_ajax({
					type: "post",
					url: variables.CHANGECATE,
					data:{
						id:$("#name").attr("_id"),
						name:$("#name").val()
				
					},
					sucesscallback(res) {
						
						if(res.code == "00") {
							that.tk_tip="修改成功";
							var timer=setTimeout(function () {
								that.ajax(that.data.url);
								that.close_tk();
								
							},800)
						}else if(res.code == "01"){
							that.tk_tip=res.message;
						}
					}
				})
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
   .tk{
   	  width:500px;height: 300px;border: 1px solid red;background: gainsboro;
   	  position: fixed;top:0;left:0;bottom: 0;right:0;margin:auto auto;
   }
   
   tr,td,th{
   	border:3px solid black;
   }
   td,th{
   	 text-align: center;
   }
   .new_add{
   	 display: inline-block;
    padding: 5px 14px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 15px;margin-bottom: 10px;cursor: pointer;
   }
</style>