<template>
     <div class="zp">
     	<img :src="draw_data.img_url.wkurl" alt="" class="wk"/>
     	<img :src="draw_data.img_url.nqurl" alt="" class="nk" :style="{'transform':draw_data.tot_deg,'-webkit-transform':draw_data.tot_deg}"/>
     	<img :src="draw_data.img_url.zzurl" alt="" class="cj_kg" @click="begin_draw($event)"/>
     </div>
           
</template>

<script>
	 import { mapGetters, mapActions } from 'vuex';
	 import * as variables from "../assets/js/common/variables.js";
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
	methods: {
		begin_draw:function () {
			
			var that=this;			
			if(this.draw_data.draw_kg){			
				this.draw_data.draw_kg=false;
				var that=this;
//				var time1=new Date().getTime();
//				先转起来
//				this.tot_deg="rotate(3600deg)";
//				$(".nq").css("transition","10s linear");
//				$(".nq").css("-webkit-transition","10s linear");
//				发送请求
					utils.my_ajax({
						loading: false,
						url: this.draw_data.ajaxurl,	
						cache: true,
						new_kg:this.draw_data.new_kg,
						"appsId": this.draw_data.appsId,
						"version":this.draw_data.version,						
						sucesscallback: (res) => {
							
							//              debugger;
							if(res.result.resultCode == "00") {
								this.draw_data.result=this.draw_data.dict[res.lucKey];

								var target_deg=utils.radom_num((3)*360+(this.draw_data.dict[res.lucKey]-1)*this.draw_data.deg+10,(3)*360+this.draw_data.dict[res.lucKey]*this.draw_data.deg-10);
								$(".nk").css("transition","4s");
								$(".nk").css("-webkit-transition","4s");
								this.draw_data.tot_deg="rotate("+target_deg+"deg)";
								this.draw_data.tk_fn();
//								$(".nq")[0].addEventListener("transitionend",function () {
//									var timer=setTimeout(function () {
//										$(".zzh").css("display","block");
//										$(".content .tk").css("top","8.6rem");
//										that.draw_kg=true;
//									},500)
//								})
//								$(".nq")[0].addEventListener("webkitTransitionEnd",function () {
//									var timer=setTimeout(function () {
//										$(".zzh").css("display","block");
//										$(".content .tk").css("top","8.6rem");
//										that.draw_kg=true;
//									},500)									
//								})
							} else {
								for(var key in this.draw_data.code){
									if(res.result.resultCode == key){
										that.tip(this.draw_data.code[key]);
									}
								}
							}
//							if(res.result.resultCode == draw_data.code){
////								$.toast("暂无抽奖权限");　
////								this.draw_kg=true;
//								draw_data.tip();
//							}else if(res.result.resultCode == "01"){	
////								$.toast("网络忙请稍后再试");
////								this.draw_kg=true;　
//								draw_data.tip();　　
//							}else if(res.result.resultCode == "04"){	
////								$.toast("活动已结束");
////								this.draw_kg=true;　
//								draw_data.tip();　　
//							}else if(res.result.resultCode == "30005"){	
////								$.toast("暂无抽奖权限");
////								this.draw_kg=true;　
//								draw_data.tip();　　
//							}	
						}
				});							
			}
	},
		tip:function (tip) {
		  	$.toast(tip);
			this.draw_data.draw_kg=true;　
		},
		tk_fn:function (zz,tk) {
			var that=this;
			$(".nk")[0].addEventListener("transitionend",function () {
									var timer=setTimeout(function () {
										zz.css("display","block");
										tk.css("top","8.6rem");
										that.draw_data.draw_kg=true;
									},500)
								})
			$(".nk")[0].addEventListener("webkitTransitionEnd",function () {
									var timer=setTimeout(function () {
										zz.css("display","block");
										tk.css("top","8.6rem");
										that.draw_data.draw_kg=true;
									},500)									
								})					
		}
	},
	watch: {
           
	},
	mounted() {
	
	},
	computed: {
		
	},
	props:["draw_data"]
}
</script>

<style scoped>
      
</style>