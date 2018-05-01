<template>
  <section class="preview">
      
      <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight" >
        <div class="profile" v-show="status === 'profile'">
         <span class="heart" @click="detail()">          
        </span>
            <h1>{{resume.profile.name || '  待填'}}</h1>
            <p>来自{{resume.profile.city ||'  待填'}}</p>
            <p>毕业于{{resume.profile.education || '  待填'}}</p>
      </div>
      </transition>
      <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
         <div class="detail" v-show="status === 'detail'">
             <el-button round size="mini" @click="download()">save as img</el-button>
             <el-button round size="mini" class="back" @click="status = 'profile'">返回</el-button>
             <div class="profilePre">
                 <img :src="resume.profile.head" alt="">
                 <div>
            <h1>{{resume.profile.name || '  待填'}}</h1>
            <h2>{{resume.profile.city ||'  待填'}}</h2>
            <h3>{{resume.profile.education ||'  待填'}}</h3>
                 </div>
           
             </div>
             <div class="project">
          <h2>项目经验</h2>
          <div class="parent">
            <div v-for="item in resume.project">
                <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
                <div class="card" v-if="!item.editMode" v-show="item.show">
                <p>{{item.name || "项目名"}}</p>
                <p>{{item.content|| "项目简介"}}</p>
                <a :href="'http://'+item.address">{{item.address|| "项目地址"}}</a>
                
             </div>
            
                </transition>
            
          </div>
          </div>
          
          
      </div>
           <div class="skill">
          <h2>掌握技能</h2>
          <div class="parent">
            <div v-for="item in resume.skill">
                <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
                <div class="card" v-if="!item.editMode" v-show="item.show">
                <p>{{item.name || "技能"}}</p>
                <p>{{item.how|| "熟练度"}}</p>
             </div>
            
                </transition>
            
          </div>
          </div>
          
          
      </div>
        <div class="cantacts" >
          <div v-for="(val,key) in resume.contacts" >
              
                 <span >
                      <i :class="span.get(key)"> </i>
                 </span>
                 <p   >{{panduan(val)}}</p>
              
                 
          </div>
      </div>
         </div>
      </transition>
  </section>
</template>

<script>
import html2canvas from "html2canvas"
    export default{
        name:'preview',
        data(){
            return {
                status:'profile',
                span: new Map([["name","姓名"],["city","城市"],["education","第一学历"],["qq","iconfont icon-qq"],["wechat","iconfont icon-wechat"],["phone","iconfont icon-phone"]]),

            }
        },
        computed:{
            resume:{
                  get (){
                    return this.$store.state.resume
                }
            },
            
            
            
        },
        methods:{
                detail(){
                       this.status = 'detail';
                       console.log("ok")
                },
                panduan(str){
                   if (str ===""){
                       return "待填"
                   }
                   else return str
                },
                download(){
                    html2canvas(document.querySelector(".preview>.detail")).then(canvas=>{
                        var type = 'png';
                        var imgData = canvas.toDataURL(type);
                        var _fixType = function(type) {
                           type = type.toLowerCase().replace(/jpg/i, 'jpeg');
                           var r = type.match(/png|jpeg|bmp|gif/)[0];
                            return 'image/' + r;
                        };
                          imgData = imgData.replace(_fixType(type),'image/octet-stream');
                          var saveFile = function(data, filename){
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;
   
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
};
   
// 下载后的问题名
var filename = 'ResumeDemo' + (new Date()).getTime() + '.' + type;
// download
saveFile(imgData,filename);
                    })
                }
            }
    }
</script>

<style lang="scss">
@keyframes breath{
  0%{
    box-shadow: 0 0 10px rgba(0,0,0,1)
  }
  100%{
    box-shadow: 0 0 10px rgba(0,0,0,0.2)
  }
}
.preview{
    min-height: 90vh;
    .card{
        background: #aaa;
    }
    padding:2em;
    background: linear-gradient(to bottom, rgb(236, 95, 149) 0%,rgb(236, 95, 149) 50%,rgb(230, 230, 230) 50%,rgb(230, 230, 230) 50%,rgb(230, 230, 230) 100%);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    >.detail{
              min-height:80%;
              width:70%;
              background: rgb(246, 247, 247);
              position: relative;
               >button{
               position: absolute;
               right:1em;
               top:1em;
               }
               >.back{
                   left:1em;
               top:1em;
               }
              >.profilePre{
                  border-bottom: 1px solid #ccc;
                  min-width:80%;
                  margin: 32px;
                  margin-top:3vh;
                  display: flex;
                 >div{
                      flex:1;
                      >h1,h2,h3{
                      margin:4vh 0;
                  }
                 }
                  >img{
                      
                      width:200px;
                      height:200px;
                      border-radius: 50%;
                  }
              }
               >.cantacts>div{
             display: block;
             margin-bottom: 24px;
            >p{
              margin-top:24px  
            }
            >span{
                margin-bottom: 24px;
            }
      }
      }
  >.profile{
          width:40%;
          padding:2em;
          background: white;
          border-radius: 4px;
          height:600px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          position: relative;
          p,h1{
              margin-bottom: 24px;
          }
          >.heart{
              cursor: pointer;
                   animation: breath 0.5s infinite alternate-reverse;
               position: relative;
               top:-140px;
             
          }
         .heart {
  background-color: rgb(236, 95, 149);
  display: inline-block;
  height: 30px;
  margin: 0 auto;
  position: relative;
  transform: rotate(-45deg);
  width: 30px;
}

.heart:before,
.heart:after {
  content: "";
  background-color: rgb(236, 95, 149);
  border-radius: 50%;
  height: 30px;
  position: absolute;
  width: 30px;
  
}

.heart:before {
  top: -15px;
  left: 0;
}

.heart:after {
  left: 15px;
  top: 0;
}
      }
     
}
      
</style>
