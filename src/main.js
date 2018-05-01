// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import animate from 'animate.css'
import './assets/reset.scss'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VanillaTilt from "vanilla-tilt"
import AV from 'leancloud-storage'
var APP_ID = 'GQqJLTBXuW3huApa0IL9cLnr-gzGzoHsz';
var APP_KEY = 'slwRmupSFP32iBa41mrKcXcg';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
}); 
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(ElementUI);

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    resume: {
      profile: {
        name: '',
        city: '',
        education: '',
        head:'../static/resumeDefault.png'
      },
      workHistory: [{
        company: '',
        content: '',
        time: ''
      }],
      project: [{
        name: '',
        content: '',
        address: '',
        editMode: false,
        show: true
      }],
      contacts: {
        qq: '',
        wechat: '',
        phone: ''
      },
      skill: [{
        name: '',
        how: "",
        editMode: false,
        show: true
      }]
    },
    
  },
  mutations: {
    
   
    
    updateHead(state,data){
         state.resume.profile.head = data.val
        
    },
    updateProfile(state, data) {
      state.resume.profile[data.key] = data.e
      console.log(state.resume.profile)
    },
    updateProject(state, data) {
      let index = state.resume.project.indexOf(data.item);
      state.resume.project[index][data.key] = data.val;
    },
    addProject(state) {
      state.resume.project.push({
        name: '',
        content: '',
        address: '',
        editMode: false,
        show: false
      })
      let length = state.resume.project.length


      //  console.log(state.resume.project[length-1])
      setTimeout(() => {
        state.resume.project[length - 1].show = true;
        let card = Array.from(document.querySelectorAll(".card"));
        card.forEach((item) => {
          VanillaTilt.init(item, {
            max: 15,
            scale: 1.2
          })
        })
      }, 0)

    },
    removeProject(state, data) {

      let index = state.resume.project.indexOf(data.item)
      if (index > 0) {
        state.resume.project[index].show = false;
        setTimeout(() => {
          state.resume.project.splice(index, 1)
        }, 500)
      }


    },
    updateContacts(state, data) {
      state.resume.contacts[data.key] = data.e
    },
    updateSkill(state, data) {
      let index = state.resume.skill.indexOf(data.item);
      state.resume.skill[index][data.key] = data.val
    },
    addSkill(state) {
      state.resume.skill.push({
        name: '',
        how: "",
        editMode: false,
        show: false
      })
      let length = state.resume.skill.length
      setTimeout(() => {
        state.resume.skill[length - 1].show = true;
        let card = Array.from(document.querySelectorAll(".card"));
        card.forEach((item) => {
          VanillaTilt.init(item, {
            max: 15,
            scale: 1.2
          })
        })
      }, 0)


    },
    removeSkill(state, data) {
      let index = state.resume.skill.indexOf(data.item)
      if (index > 0) {
        state.resume.skill[index].show = false;
        setTimeout(() => {
          state.resume.skill.splice(index, 1)
        }, 500)
      }

    }

  }
})
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  store
})
