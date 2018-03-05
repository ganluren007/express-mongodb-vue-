<template>
    <div class="ques">
    	<div class="ts">
    	    <img :src="data.ts_url" alt="" />
    	</div>
    	<div class="con">
    		<img :src="data.bj_url" alt="" />
    		<div class="question one">
    		   <img :src="data.ques_url[0].no_active" alt="" />
    		   <img :src="data.ques_url[0].active" alt="" />
    		</div>
    		<div class="question two">
    			<img :src="data.ques_url[1].no_active" alt="" />
    		    <img :src="data.ques_url[1].active" alt="" />
    		</div>
    		<div class="question three">
    			<img :src="data.ques_url[2].no_active" alt="" />
    		    <img :src="data.ques_url[2].active" alt="" />
    		</div>
    		<div class="question four">
    			<img :src="data.ques_url[3].no_active" alt="" />
    		    <img :src="data.ques_url[3].active" alt="" />
    		</div>
    	</div>
    </div>
</template>

<script>
	 export default {
		beforeCreate: function() {}
		,
		created() {}
		,
		data() {
			return {}
		}
		,
		components: {}
		,
		methods: {}
		,
		watch: {}
		,
		mounted() {}
		,
		computed: {}
		,
		props:["data"]
	}
</script>

<style scoped>
	
	
	
	.ts img{
    	width:8.5rem;height: 1.15rem;
    }
    .con{
    	width:14.75rem;margin:1rem auto 0;position: relative;
    }
    .con .bj{
    	width:14.75rem;height: 15rem;position: absolute;top:0;left:0;
    }
    .con .question img,.con .question{
    	width:12rem;height: 2rem;position: absolute;
    	
    }
    
    .con .question{
    	left:1.37rem;
    }
    .con .one{
    	top:8.8rem;
    }
    .con .two{
    	top:6.05rem;
    }
    .con .three{
    	top:3.3rem;
    }
    .con .four{
    	bottom:0.55rem;
    }
</style>