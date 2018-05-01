<template>
  <header class="topBar">
       
     <ul>
         <li v-bind:class="{active:index === 0}" @click="update($event)">Start</li>
         <li v-bind:class="{active:index === 1}" @click="update($event)">Detail</li>
         <li v-bind:class="{active:index === 2}" @click="update($event)">Preview</li>
         <li v-bind:class="{active:index === 3}" @click="update($event)">End</li>
     </ul>
    
  </header>
</template>

<script>
import AV from 'leancloud-storage'
    export default{
        name:'topbar',
        data(){
            return {
                index:0
            }
        },
        watch:{
             index:function(val,oldva){
                 this.$emit('update',{
                     index:this.index
                 })
                 
             }
        },
        methods:{
            update(e){
                if(this.index !== Array.from(e.target.parentNode.children).indexOf(e.target)){
                 this.index = -1;
               setTimeout( ()=>{
                 this.index = Array.from(e.target.parentNode.children).indexOf(e.target);
               },500)
                }
            //    this.index = Array.from(e.target.parentNode.children).indexOf(e.target);
            },
            logout(){
                 AV.User.logOut();
                 this.$store.commit("setUser",{user:null})
                 window.location.reload();
            }
        }
    }
</script>

<style lang="scss">
   .topBar{
       border-bottom: 1px solid #ccc;
       padding-bottom: 2vh;
       nav{
           float:right;
       }
       >ul{
           width:40vw;
           display: flex;
           justify-content: space-around;
           font-weight: bold;
           >li.active{
               color:rgb(255, 211, 78)
           }
           >li{
               cursor: pointer;
               padding:8px;
           }
       }
       
   }
   .topBar::after{
        display: block;
        clear: both;
        content:'',
   }
</style>
