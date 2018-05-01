<template>
  <section class="start">
       <div class="parent">
           <div class="card" data-tilt data-tilt-scale="1.1">
               <div>
                  <span>
                      <i class="iconfont icon-heart"> </i>
                  </span>
               </div>
               <h1 >
                      这是一个简历编辑器
               </h1>
               <h2>
                   Resume For You
               </h2>
               <hr>
               <div class="intro">
                   <img src="../../static/mail.png" alt="图片">
               <p>你可以在这里编辑你的简历</p>
               <p>你可以在线查看也可以导出为图片</p>
               <span>Thanks!</span>
               
               </div>
           </div>
       </div>
       
  </section>
</template>

<script>
    export default{
        name:'start',
        data(){
            return {
                
            }
        },
    
        methods:{
             isEmpty(item){
                 let flag = true;
                  for(let i in item){
                         if(item[i] !== ''){
                              flag = false;
                         }
                  }
                  return flag;
             }
        }
        ,
        computed:{
            resume:{
                get(){
                     return this.$store.state.resume
                     },
            //    set(value){
            //          return this.$store.commit('updateProfile', value)
                     
            //        }
             
            }
        }
    }
</script>

<style lang="scss">
      .start{
          .parent{
            height:100vh;
             background: linear-gradient(to bottom, rgb(236, 95, 149) 0%,rgb(236, 95, 149) 50%,rgb(230, 230, 230) 50%,rgb(230, 230, 230) 50%,rgb(230, 230, 230) 100%);
             display: flex;
             justify-content: center;
             align-items: center;
            >.card{
                position: relative;;
                height:600px;
                width:525px;
                background: white;
                border-radius: 4px;
                box-shadow: 0 3px 8px rgba(0, 0, 0, .25);
                >div:nth-child(1){
                    display:flex;
                    justify-content: center;
                    align-items: center;
                     position: absolute;
                     border-radius: 50%;
                     width:8vh;
                     height:8vh;
                     top:-4vh;
                     right:calc( 50% - 4vh);
                     background: white;
                     >span>i{
                         font-size: 2.2em;
                         color:rgb(236, 95, 149);
                     }
                }
                >h1{
                    margin-top:6vh;
                }
                >h2{
                    font-family: 'Dancing Script', cursive;
                    margin-top:6vh;
                    font-size:3em;
                }
                >hr{
                    position: absolute;
                    width:calc( 100% - 2vw);
                    height:2px;
                    background-color:rgb(230, 230, 230);
                    border:none;
                    top:50%;
                }
                >.intro{
                    margin-top:calc( 50% - 12vh);
                    text-align: left;
                    padding:2em;
                    >p{
                        margin-bottom: 5vh;
                    }
                    >img{
                        width:40%;
                        float: right;
                    }
                    >span{
                         font-family: 'Dancing Script', cursive;
                          font-size:2.5em;
                    }
                }
            }
            >.card:after{
                content:'';
                display: block;
                width:4vw;
                height:4vw;
                // background: rgba(0,0,0,0);
                background: linear-gradient(to bottom, rgb(236, 95, 149) 0%,rgb(236, 95, 149) 50%,rgb(230, 230, 230) 50%,rgb(230, 230, 230) 50%,rgb(230, 230, 230) 100%);
                border-radius: 50%;
                position: absolute;
                top:calc( 50% - 2vw);
                left: -2vw;
            }
             >.card:before{
                content:'';
                display: block;
                width:4vw;
                height:4vw;
                // background: rgba(0,0,0,0);
                background: linear-gradient(to bottom, rgb(236, 95, 149) 0%,rgb(236, 95, 149) 50%,rgb(230, 230, 230) 50%,rgb(230, 230, 230) 50%,rgb(230, 230, 230) 100%);
                border-radius: 50%;
                position: absolute;
                top:calc( 50% - 2vw);
                right: -2vw;
            }
          }
          
      }
</style>
