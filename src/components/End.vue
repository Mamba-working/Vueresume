<template>
  <section class="end">
      <transition enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
         <div v-show="index===3">
           <h1>
           Thanks
       </h1>
       <h1>
           For
       </h1>
       <h1>
           Using
       </h1>
       <h1>
           !
       </h1>
         </div>
      </transition>
      
  </section>
</template>

<script>
    export default{
        name:'end',
        props:["index"],
        data(){
            return {
                status:-1
            }
        },
        
    }
</script>

<style lang="scss">
      .end{
          >div{
              height:100%;
               display: flex;
          flex-direction: column;
          justify-content: space-around;
          }
          height:80vh;
         
      }
</style>
