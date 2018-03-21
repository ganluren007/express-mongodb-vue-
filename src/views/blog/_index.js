import { mapGetters, mapActions } from 'vuex';
import * as variables from "../../assets/js/common/variables.js";
export default {
	beforeCreate: function() {

	},
	created() {

		var that = this;
		utils.yz_token(variables.YZTOKEN, function(res) {
			console.log(typeof res)
			if(res.code == "00") {
				that.isAdmin = res.result.isAdmin;
				that.dl_mes.username = res.result.username;
				that.tx_url=res.result.img_url||"http://localhost:3000/uploads/mr.jpg";
				that.login_bol = false;
				that.zc_bol = false;
				that.tip_bol = true;
			}
		})

		utils.my_ajax({
			type: "post",
			url: variables.GETINDEXIFO,
			sucesscallback: function(res, status, xhr) {

				console.log(status)
				console.log(xhr)
				that.catIfo = res.result.cateIfo;
				that.content = res.result.content;
				if(res.result.content.length === 0) that.tipBol = true
			}
		})
	},
	data() {
		return {
			tip_bol: false,
			login_bol: false,
			zc_bol: true,
			zc_tip: "",
			dl_tip: "",
			zc_mes: {
				username: "",
				password: "",
				repassword: ""
			},
			dl_mes: {
				username: "",
				password: ""
			},
			isAdmin: false,
			catIfo: [],
			content: [],
			tipBol: false,
			menu_index: 0,
			tx_url:""
		}
	},
	components: {

	},
	methods: {

		getcatefile: function(event) {

			var that = this
			that.tipBol = false;

			that.menu_index = event.currentTarget.getAttribute("index")
			//			$(event.currentTarget).addClass("active")
			utils.my_ajax({
				type: "post",
				url: variables.FINDCATEIFO,
				data: {
					_id: event.currentTarget.getAttribute("myid")
				},
				sucesscallback: function(res) {
					//					console.log(res.result.content.length)
					that.$router.push({
						path: 'list',
						query: res.result.content
					})
					that.content = res.result.content;
					if(res.result.content.length === 0) that.tipBol = true
				}
			})
		},
		gzj: function(zjm) {
			this.$router.push(zjm)
		},
		go_file: function() {
			this.$router.push("file");
		},
		qk: function() {
			this.zc_mes = {
				username: "",
				password: "",
				repassword: ""
			}
			this.dl_mes = {
				username: "",
				password: ""
			}
		},
		go_dl: function() {
			this.login_bol = true;
			this.zc_bol = false;
			this.qk();
		},
		go_zc: function() {
			this.login_bol = false;
			this.zc_bol = true;
			this.qk();
		},
		zc: function() {
			var that = this;
			if(this.zc_mes.username === "") {
				this.zc_tip = "用户名不能为空";
				return;
			} else if(this.zc_mes.password === "") {
				this.zc_tip = "密码不能为空";
				return;
			} else if(this.zc_mes.password !== this.zc_mes.repassword) {
				this.zc_tip = "两次密码必须相同";
				return;
			}

			utils.my_ajax({
				type: "post",
				url: variables.REGISTER,
				data: {
					username: this.zc_mes.username,
					password: this.zc_mes.password
				},
				sucesscallback(res) {
					console.log(this)
					if(res.code == "00") {
						that.zc_tip = "注册成功，正在跳转登录页面————";
						setTimeout(function() {
							that.login_bol = true;
							that.zz_bol = false;
						}, 1000)

					} else if(res.code == "01") {
						that.zc_tip = res.message;
					}
				}
			})
		},
		dl: function() {
			var that = this;
			if(this.dl_mes.username === "") {
				this.dl_tip = "用户名不能为空";
				return;
			} else if(this.dl_mes.password === "") {
				this.dl_tip = "密码不能为空";
				return;
			}
			utils.my_ajax({
				type: "post",
				url: variables.LOGIN,
				data: {
					username: this.dl_mes.username,
					password: this.dl_mes.password
				},
				sucesscallback(res) {
					console.log(this)
					if(res.code == "00") {
						that.dl_tip = "登录成功，正在跳转主页————";
						that.isAdmin = res.result.isAdmin;
						that.tx_url=res.result.img_url||"http://localhost:3000/uploads/mr.jpg";
						localStorage.setItem("userIfo", JSON.stringify(res.result))

						setTimeout(function() {
							that.tip_bol = true;
							that.login_bol = false;
							that.zc_bol = false;
							
						}, 2000)

					} else {
						that.dl_tip = res.message;
					}
				}
			})
		},
		logout: function() {
			this.login_bol = true;
			this.tip_bol = false;
			this.zc_bol = false;
			localStorage.removeItem("userIfo")
		},
		uploadImg: function() {
			var that=this
			var xhr = new XMLHttpRequest();
			xhr.open('post', variables.UPLOADIMG);
			xhr.onload = function() {
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
					
					console.log(JSON.parse(xhr.responseText).imgurl)
					that.tx_url=JSON.parse(xhr.responseText).result.imgurl
					setTimeout(function(){
						
					},15000)
					
				}
				
			}
			var formData = new FormData();
			formData.append("file",document.getElementById("imgInput").files[0]);
			formData.append("mes",localStorage.getItem("userIfo"));
			
			xhr.send(formData);
		}
	},
	watch: {

	},
	mounted() {

	},
	computed: {

	}
}