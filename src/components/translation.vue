<template>
<div >
  <div v-if="loadingRouteData=='00'" class="loadingPage">
    <div class="transcover"></div>
    <div class="loadingner">
      <div class="loadingner1"></div>
      <div class="loadingner2"></div>
      <div class="loadingner3"></div>
      <div class="loadingner4"></div>
      <div class="loadingner5"></div>
    </div>
  </div>
  <slot v-else></slot>
</div>
</template>

<script>
  export default {
    props: {
      loadingRouteData: {
        type: String,
        default: ''
      }
    },
    mounted() {
      var self = this;
      if(self.loadingRouteData!="00"){
        self.$store.dispatch('afterRouterLoade',{tag:"finish"});
        setTimeout(function(){self.$store.dispatch('afterRouterLoade',{tag:"load"});},10);
      }
    }
  }
</script>

<style>
  .loadingPage{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
  .transcover {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .loadingner{
    position: relative;
    z-index: 2;
    margin: 12rem auto 0;
    width: 3rem;
    height: 2.4rem;
    text-align: center;
    font-size: 0.4rem;
  }
  .loadingner > div {
    background-color: #ffffff;
    height: 100%;
    width: 0.24rem;
    display: inline-block;
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }
  .loadingner .loadingner1{
    
  }
  .loadingner .loadingner2{
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .loadingner .loadingner3{
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
  .loadingner .loadingner4{
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .loadingner .loadingner5{
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  @-webkit-keyframes stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
    20% { -webkit-transform: scaleY(1.0) }
  }
   
  @keyframes stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }
</style>