<template>
  <div class="user">
      <div class="type">
          <span :class="{active:type==='signUp'}" @click="change('signUp')">注册</span>
          <span :class="{active:type==='login'}" @click="change('login')">登录</span>
      </div>
      <div class="action">
          <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
           <div class="signUp" v-show="type === 'signUp'">
          
          <form @submit.prevent=signUp>
               <div class="formRow">
                   <span class="lable">用户名  </span>
            <el-input type="text" v-model="formData.username"></el-input>
            </div>
            <div class="formRow">
                <span class="lable">密码</span>
             <el-input type="password" v-model="formData.password"></el-input>
              </div>
            <div class="formActions">
              <el-input type="submit" value="注册"></el-input>
            </div>
          </form>
      </div>
          </transition>
          <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
    <div class="login"  v-show="type === 'login'">
          
          <form @submit.prevent=login>
               <div class="formRow">
                   <span class="lable">用户名  </span>
            <el-input type="text" ></el-input>
            </div>
            <div class="formRow">
                <span class="lable">密码</span>
             <el-input type="password" ></el-input>
              </div>
            <div class="formActions">
              <el-input type="submit" value="登录"></el-input>
            </div>
          </form>
      </div>
          </transition>
  
      </div>
      
  </div>
</template>


<script>
import AV from 'leancloud-storage'
    export default{
        name:"user",
        data(){
            return {
                type:"signUp",
                formData:{
                    username:'',
                    password:''
                }
            }
        },
        computed:{
            currentUser:{
                get(){
                    return this.$store.state.currentUser
                },
               
            }
        },
        methods:{
           getCurrentUser: function () { // 👈
                let {id, createdAt, attributes: {username}} = AV.User.current()
     
                 return {id, username, createdAt} 
                   },
                change(str){
                    if(this.type !==str){
                    this.type = '';
                    setTimeout(()=>{this.type = str},550)
                    }
                     
                },
                signUp(){
                     let user = new AV.User();
                     console.log("ok")
                     user.setUsername(this.formData.username);
                     user.setPassword(this.formData.password);
                     user.signUp().then((loginedUser) => { // 👈，将 function 改成箭头函数，方便使用 this
                     this.$store.commit("setUser",{user:this.getCurrentUser})
                    let query = new AV.Query("resume");
                    query.find()
            .then((todos) => {
          let avAllTodos = todos[0] // 因为理论上 AllTodos 只有一个，所以我们取结果的第一项
          let id = avAllTodos.id
          this.$store.commit("getData",{data:JSON.parse(avAllTodos.attributes.content)})   // 为什么有个 attributes？因为我从控制台看到的
          this.todoList.id = id // 为什么给 todoList 这个数组设置 id？因为数组也是对象啊
            }),function(error){
              console.log(error)
            }
                  }, (error) => {
                      alert('注册失败') // 👈
                     });
                },
                login: function () {
                  AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => { // 👈
                    //  this.currentUser = this.getCurrentUser() // 👈
                     this.$store.commit("setUser",{user:this.getCurrentUser})
                     
          let query = new AV.Query("resume");
          console.log("ok")
                    query.find()
            .then((todos) => {
          let avAllTodos = todos[0] // 因为理论上 AllTodos 只有一个，所以我们取结果的第一项
          let id = avAllTodos.id
          this.$store.commit("getData",{data:JSON.parse(avAllTodos.attributes.content)})   // 为什么有个 attributes？因为我从控制台看到的
          this.todoList.id = id // 为什么给 todoList 这个数组设置 id？因为数组也是对象啊
            }),function(error){
              console.log(error)
            }
                  }, (error) => {
                      alert('注册失败') // 👈
                     });
                  },
        }
    }
</script>

<style lang="scss">
.user{
    >.type{
        >span{
            padding:16px;
            cursor: pointer;
        }
        .active{
            border-bottom: 1px solid #aaa;
        }
    }
    >.action{
 >.signUp,>.login{
        .formRow{
            display:flex;
            justify-content: center;
            >span{                 
              flex: 1;
              align-self: center;
              text-align: right;
            }
            >.el-input{

    display: inline-block;
    flex: 2;
    text-align: left;
          >input{
              margin-left: 24px;
          }
            }
        }
        input{
            width:70%;
            margin-bottom:32px;
            margin-top:32px;
        }
        input[type=submit]{
            width:72px;
        }
    }
    }
   
}
</style>
