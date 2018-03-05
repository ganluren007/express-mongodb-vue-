<template>
	<div>
	  <table class="table table-hover table-striped">
           <a @click="add_tk($event,'add')" class="new_add">新增</a>
			<tr>
				<th v-for="item in data.title">{{item}}</th>
				<th>操作</th>
			</tr>

			<tr v-for="item in content" class="tr" :_id="item._id">
				<td class="id title">{{item.title}}</td>
				<td class="description">{{item.description}}</td>
				<td class="category">{{item.category.name}}</td>
							
				<td class="views">{{item.views}}</td>
				<td class="comments">{{item.comments.length}}</td>
				
				
				<td> <a @click="add_tk($event,'change')">修改</a> | <a>删除</a></td>
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
		
		
		<div class="tk" v-show="tk_bol">
			<div @click="close_tk">关闭</div>
			
				标题：<input type="text" value="" id="name" v-model="tk_con.title"/>  <br />
				简介：<input type="text" value="" id="name" v-model="tk_con.description"/><br />
				分类：
				<select id="select">
				  <option value="volvo" v-for='item in tk_con.category' :_id="item._id" >{{item.name}}</option>
				  
				</select><br />
				内容：
				<textarea name="" rows="" cols="" v-model='tk_con.content'></textarea><br />
				<span>{{tk_tip}}</span>
				<button @click="add_con" v-if="tk_but=='0'">保存</button>
				<button @click="change_con" v-if="tk_but=='1'">修改</button>
			
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
//		this.ajax(variables.GETCATEIFO)
	},
	data() {
		return {
				content: [],
//				请求第几页
				page:1,
//				总数量
				totsize:"",
//				每页展示条数
				size:3,
				tk_con:{
					title:"",description:"",category:[],content:""
				},
				tk_bol:false,
				tk_tip:'',
				tk_but:"",
				change_id:''
		}
	},
	components: {

	},
	methods: {
		tk:function(){
			this.tk_bol=true;
		},
		close_tk:function(){
			this.tk_bol=false;
			this.clearData();
			this.tk_tip="";
		},
//		关闭弹框时清空数据
        clearData:function(){
        	for(var key in this.tk_con){
        		if(key=="category"){
        			continue
        		}else{
        			this.tk_con[key]="";
        		}
        	}
        },
		
		
//		添加内容
		add_tk:function  (event,bs) {
			this.tk();
			var par_tr=$(event.currentTarget).parents(".tr");
			var options=$("#select option")
			if(bs=="add"){
				this.tk_but="0"
			}else{
				this.change_id=par_tr.attr("_id");
				this.tk_but="1"
				for(var key in this.tk_con){
					if(key=="category"){
						continue
					}
					this.tk_con[key]=par_tr.children("."+key).text();
				}
				for(var i=0;i<options.length;i++){					
					if(options.eq(i).text()==par_tr.children(".category").text()){
						options.eq(i).attr("selected","selected");
					}
				}				
			}			
		},
//		提交时的验证
		tjyz:function  () {
			
		},
		addOrChange(option){
			var that=this;
			for(var key in this.tk_con){
				if(!this.tk_con[key]){
					this.tk_tip=key+"不能为空"
					return;
				}
			}
			var data=this.tk_con;
			data.category=$('option').not(function(){ return !this.selected }).attr("_id");
//			data['users']=localStorage.getItem("userIfo").token;
			
			utils.my_ajax({
					type: "post",
					url: option.url,
					data:data,
					sucesscallback(res) {
						
						if(res.code == "00") {
							that.tk_tip=option.tip;
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
		
		add_con:function(){
			this.addOrChange({url:variables.ADDCONTENT,tip:"添加成功"})			
		},
//		修改内容        
        change_con:function  () {
//      	this.addOrChange({url:variables.CHANGECONTENT,tip:"修改成功"})		
        	var that=this;
			for(var key in this.tk_con){
				if(!this.tk_con[key]){
					this.tk_tip=key+"不能为空"
					return;
				}
			}
			var data=this.tk_con;
			data.id=this.change_id;
			data.category=$('option').not(function(){ return !this.selected }).attr("_id");
			utils.my_ajax({
					type: "post",
					url: variables.CHANGECONTENT,
					data:data,
					sucesscallback(res) {
						
						if(res.code == "00") {
							that.tk_tip="修改成功";
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
							that.content = res.result.content_ifo
							that.tk_con.category=res.result.cate
							
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

	},
	computed: {

	},
    props: ["data"]
}
</script>

<style>
</style>