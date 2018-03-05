
import { mapGetters, mapActions } from 'vuex';
import * as variables from "../../assets/js/common/variables.js";
import user_tab from "../../components/tab/user_tab.vue";
import cate_tab from "../../components/tab/cate_tab.vue";
import content_tab from "../../components/tab/content_tab.vue";
export default {
	beforeCreate: function() {

	},
	created() {
//	    判断是否为管理员
		if(!JSON.parse(localStorage.getItem("userIfo")).isAdmin){
		    this.$router.push("/")
		}
	},
	data() {
		return {
			userIfo:JSON.parse(localStorage.getItem("userIfo")),
			user_data:[],
			bsf:"",
			user_prop:{title:["","","",""],url:""},
			cate_prop:{title:["","","",""],url:""},
			content_prop:{title:["","","",""],url:""}
		}
	},
	components: {
			user_tab,cate_tab,content_tab
	},
	methods: {
		getuserifo:function(){
			this.bsf="1";
			this.user_prop={title:["ID","用户名","密码","是否为管理员"],url:variables.GETUSERIFO}
		},
		getcateifo:function () {
			this.bsf="2";
			this.cate_prop={title:["ID","分类名"],url:variables.GETCATEIFO}
		},
		getcontentifo:function () {
			this.bsf="3";
			this.content_prop={title:["标题","简介",'分类',"浏览量","评论量"],url:variables.GETCONTENTIFO}
		}
	},
	watch: {

	},
	mounted() {

	},
	computed: {

	}
}