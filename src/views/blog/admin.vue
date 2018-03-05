<template>
	<div>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="/admin">后台管理</a>
				</div>

				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li>
							<a href="#" @click="getuserifo()">用户管理</a>
						</li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" @click="getcateifo()">分类管理 <span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li>
									<a href="/admin/category">分类首页</a>
								</li>
								<li>
									<a href="/admin/category/add">添加分类</a>
								</li>
							</ul>
						</li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" @click="getcontentifo()">内容管理 <span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li>
									<a href="/admin/content">内容首页</a>
								</li>
								<li>
									<a href="/admin/content/add">添加内容</a>
								</li>
							</ul>
						</li>
					</ul>

					<ul class="nav navbar-nav navbar-right">
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{userIfo.username}}<span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li>
									<a href="#">退出</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<div class="jumbotron">
			<h1>Hello, {{userIfo.username}}!</h1>
			<p>欢迎进入我的博客后台管理！</p>
		</div>

		<div class="container-fluid">
			<div class="user_ifo">
				<user_tab :data="user_prop" v-show="bsf=='1'"></user_tab>
				<cate_tab :data="cate_prop" v-show="bsf=='2'"></cate_tab>
				<content_tab :data="content_prop" v-show="bsf=='3'"></content_tab>
			</div>
		</div>
	</div>
	<!--顶部导航-->

</template>

<script>
	import admin from "./admin.js"
	export default admin
</script>

<style scoped>
	tr,
	td,
	th {
		border: 3px solid black;
	}
	
	td,
	th {
		text-align: center; 
	}
	
	.new_add {
		display: inline-block;
		padding: 5px 14px;
		background-color: #fff;
		border: 1px solid #ddd;
		border-radius: 15px;
		margin-bottom: 10px;
		cursor: pointer;
	}
</style>