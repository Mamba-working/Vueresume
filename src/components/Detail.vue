<template>
  <section class="detail">
      
      <nav></nav>
      <div class="profile" >
          <div class="head">
              <img :src="resume.profile.head ">
          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @input="updateHead($event.target)">
          </div>
          
          <h1>个人信息</h1>
          <div v-for="(val,key) in resume.profile">
<el-input :value="resume.profile[key]" @input="updateProfile(key,$event)" :placeholder="span.get(key)" v-if="key !== 'head'"></el-input>
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
                <p>{{item.address|| "项目地址"}}</p>
                 <el-button type="primary"  size="mini" plain @click="item.editMode=true">修改</el-button>
                 <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="removeProject(item)"></el-button>
             </div>
             <div class="card" v-if="item.editMode" v-show="item.show">
                <el-input  type="textarea" :value="item.name||'项目名'" @input="updateProject(item,'name',$event)"></el-input>
                <el-input  type="textarea" :value="item.content||'项目简介'" @input="updateProject(item,'content',$event)"></el-input>
                <el-input  type="textarea" :value="item.address||'项目地址'" @input="updateProject(item,'address',$event)"></el-input>
                 <el-button type="primary"  size="mini" plain @click="item.editMode=false">保存</el-button>
             </div>
                </transition>
            
          </div>
          </div>
          <el-button type="primary" icon="el-icon-plus" circle @click="addProject()"></el-button>
          
      </div>
      
      <div class="cantacts">
          <div v-for="(val,key) in resume.contacts">
              
                 <span>
                      <i :class="span.get(key)"> </i>
                 </span>
                 <el-input  placeholder="请输入内容" :value="val" @input="updateContacts(key,$event)"></el-input>
              
                 
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
                
                 <el-button type="primary"  size="mini" plain @click="item.editMode=true">修改</el-button>
                 <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="removeSkill(item)"></el-button>
             </div>
             <div class="card" v-if="item.editMode" v-show="item.show">
                <el-input  type="textarea" :value="item.name||'技能'" @input="updateSkill(item,'name',$event)"></el-input>
                <!-- <el-input  type="textarea" :value="item.content||'熟练度'" @input="updateSkill(item,'how',$event)"></el-input> -->
                <el-select v-model="item.how">
                  <el-option value=了解 label=了解 >

                  </el-option>
                  <el-option value=熟悉 label=熟悉 >

                  </el-option>
                  <el-option value=精通 label=精通 >

                  </el-option>
                 
                </el-select>
                 <!-- <div v-for="(val,key) in item.how">
                      {{val}}
                      {{key}}
                  </div> -->
                
                 <el-button type="primary"  size="mini" plain @click="item.editMode=false">保存</el-button>
             </div>
                </transition>
            
          </div>
          </div>
          <el-button type="primary" icon="el-icon-plus" circle @click="addSkill()"></el-button>
          
      </div>
  </section>
</template>

<script>

    export default{
        name:'detail',
        components: {
           
    },
        data(){
            return {
               span: new Map([["name","姓名"],["city","城市"],["education","第一学历"],["qq","iconfont icon-qq"],["wechat","iconfont icon-wechat"],["phone","iconfont icon-phone"]]),
               projectTimer:null,
               skillTimer:null
            }
        },
      
        methods:{
        
            
            updateHead(val){
                // this.$store.commit("updateHead",{e})
                var file = val.files[0];    
                let that =this;           
//   console.log(obj);console.log(file);
//   console.log("file.size = " + file.size);
  var reader = new FileReader();
  reader.onloadstart = function (e) {
     console.log("开始读取....");
  }
    reader.onprogress = function (e) {
         console.log("正在读取中....");
  }
  reader.onabort = function (e) {
     console.log("中断读取....");
  }
  reader.onerror = function (e) {
      console.log("读取异常....");
  }
  reader.onload = function (e) {
      console.log("成功读取....");
    //   img.src = e.target.result;
    that.$store.commit("updateHead",{val:e.target.result})
   //或者 img.src = this.result;  //e.target == this
  }
      reader.readAsDataURL(file)
            },
           updateProfile(key,e){
                this.$store.commit("updateProfile",{key,e})
               
           },
           updateProject(item,key,val){
             this.$store.commit("updateProject",{item,key,val})
           },
           addProject(){
               if(this.projectTimer){
                   clearTimeout(this.projectTimer)
               }
               this.projectTimer = setTimeout(()=>{
                   this.$store.commit("addProject")
               },300)
               
           },
           removeProject(item){
                this.$store.commit("removeProject",{item})
               
           },
           updateContacts(key,e){
               this.$store.commit("updateContacts",{key,e})
           },
           updateSkill(item,key,val){
                this.$store.commit("updateSkill",{item,key,val})
           },
           addSkill(){
                    if(this.skillTimer){
                   clearTimeout(this.skillTimer)
               }
               this.projectTimer = setTimeout(()=>{
                   this.$store.commit("addSkill")
               },300)
           },
           removeSkill(item){
               this.$store.commit("removeSkill",{item})
           },
          
        },
        computed:{
           resume:{
                get (){
                    return this.$store.state.resume
                }
            },
          
           
        }
    }
</script>

<style lang="scss">
.detail{
    background: rgb(246, 247, 247);
    >.profile{
        padding:2em;
        padding-bottom: 5em;
        border-bottom: 1px solid #ccc;
        >.head{
            border-radius: 50%;
            float: left;
            position: relative;
            >input{
               
            display: inline-block;
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            opacity: 0;
            width:250px;
            height:250px;            
            }
            >img{
                width:250px;
                height:250px;
                border-radius: 50%;
            }
        }
        >div{
            width:30%;
            margin:0 auto;
            input{
                margin:1em;
            }
        }
    }
    >.project,>.skill{
         padding: 2em;
         position: relative;
         border-bottom: 1px solid #ccc;
          >.parent{
              display: flex;
              flex-wrap: wrap;
             
              >div{
              display: flex;
              >.card{
                  margin:3em;
                  box-shadow: 0 3px 8px rgba(0, 0, 0, .25);
                  padding:2em;
                  height:300px;
                  width:200px;
                  position: relative;
                  border-radius: 3px;
                  display: flex;
                  flex-direction: column;
                  overflow: scroll;
                  justify-content: space-around;
                  >p,div{
                      flex:1
                  }
                  .el-button--danger{
                      position: absolute;
                      top:5px;
                      right:5px;
                  }
              }
              
          }
          }
       >button{
                  position: absolute;
                  top:8px;
                  right:4px;
              }
    }
    >.cantacts{
        .el-input{
            width:30%;
        }
        >div{
            display: flex;
            justify-content: center;
            align-items: center
        }
        .iconfont{
           
           font-size: 2em;
        }
        input{
            display: inline-block;
            width:100%;
            margin:24px;
        }
        border-bottom: 1px solid #ccc;
        padding: 2em;
    }
}
    
</style>
