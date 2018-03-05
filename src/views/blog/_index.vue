<template>
	<div class="tem">
		<div class="content native-scroll">
			<header>
				<div class="backimg"><img src="../../assets/images/IMG_0293.jpg"></div>
				<div class="logo"><span></span><img src="../../assets/images/00002637.jpg"></div>
			</header>

			<nav>
				<div class="menu">

					<!--<a href="javascript:;" class="focus">首页</a>-->

					<!--<a href="/">首页</a>-->
                    
					<a @click="getcatefile($event)" v-for="item in catIfo" :myid="item._id" >{{item.name}}</a>

				</div>
			</nav>

			<main class="clear">
				<div class="mainLeft">
					<div v-if="tipBol">该分类暂无内容</div>
					<div class="listBox" v-for="item in content">
						<h1>{{item.title}}</h1>
						<p class="colDefault">
							作者：<span class="colInfo">{{item.users.username}}</span>  - 阅读：
							<span class="colInfo">{{item.views}}</span> - 评论：
							<span class="colInfo">{{item.comments.length}}</span>
						</p>
						<dfn><p>{{item.content}}</p></dfn>
						<div class="function">
							<a href="">阅读全文</a>
						</div>
					</div>
				</div>

				<div class="mainRight">

					<div class="rightBox" id="userInfo" v-if="tip_bol">
						<div class="title"><span>用户信息</span></div>
						<p><span class="colDark"></span></p>

						<p>
							<span class="colDanger">你好，<span>{{dl_mes.username}}</span></span>
							<a  v-if="isAdmin" @click="gzj('admin')" style="cursor:pointer">进入管理</a>
						</p>
						<!--<p><span class="colDanger">你好，欢迎光临我的博客！</span></p>-->
						<p><span class="colDark"><a href="javascript:;" id="logout" @click="logout">退出</a></span></p>
					</div>

					<div class="rightBox" id="loginBox" v-if="login_bol">
						<div class="title"><span>登录</span></div>
						<div class="line"><span class="colDark">用户名：</span><input name="username" type="text" v-model="dl_mes.username" /><em></em></div>
						<div class="line"><span class="colDark">密码：</span><input name="password" type="password" v-model="dl_mes.password" /><em></em></div>
						<div class="line"><span class="colDark"></span><button @click="dl">登 录</button></div>
						<p class="textRight">还没注册？
							<a href="javascript:;" class="colMint" @click="go_zc">马上注册</a>　</p>
						<p class="colWarning textCenter">{{dl_tip}}</p>
					</div>

					<div class="rightBox" id="registerBox" v-if="zc_bol">
						<div class="title"><span>注册</span></div>
						<div class="line"><span class="colDark">用户名：</span><input name="username" type="text" v-model="zc_mes.username" /></div>
						<div class="line"><span class="colDark">密码：</span><input name="password" type="password" v-model="zc_mes.password" /></div>
						<div class="line"><span class="colDark">确认：</span><input name="repassword" type="password" v-model="zc_mes.repassword" /></div>
						<div class="line"><span class="colDark"></span><button @click="zc">注 册</button></div>
						<p class="textRight">已有账号？
							<a href="javascript:;" class="colMint" @click="go_dl">马上登录</a>　</p>
						<p class="colWarning textCenter">{{zc_tip}}</p>
					</div>

					
				</div>

			</main>

			<div class="copyright textCenter">Copyright © miaov.com 版权所有 | 京ICP备08102442号</div>
		</div>
	</div>

</template>

<script>
	import _index from "./_index.js"
	export default _index
</script>

<style scoped>
	@import "./_index.css";
</style>