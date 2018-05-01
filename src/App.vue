<template>
  <div id="app">
    
    <top-bar v-on:update="update" />
    <main >
      <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight" >
       <start v-show="index === 0"/>
      </transition>
         <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight" >
       <detail v-show="index === 1" v-bind:active="index === 1"/>
      </transition>
       <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight" >
       <preview v-show="index === 2"/>
      </transition>
       <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight" >
       <end v-show="index === 3" :index="index"/>
      </transition>
      
    </main>
    
  </div>
</template>

<script>
import topBar from './components/topBar'
import start from './components/start'
import preview from './components/preview'
import end from './components/End'
import detail from './components/Detail'
import user from './components/user'
export default {
  name: 'App',
  components: {
    topBar,
    start,
    preview,
    end,
    detail,
    user
  },
  computed:{
     
  },
  data(){
    return {
      index:-1,
      
    }
  },
  watch:{
      
  },
  methods:{
    update(data){
      this.index = data.index
    },
    
  },
  created(){
    setTimeout( ()=>{
           this.index = 0;
    },500)
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5vh;
  >main{
    position: relative;
      
  }
 
}
</style>
