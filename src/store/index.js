import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import jwt_decode from 'jwt-decode'
import Vuex from 'vuex'
import router from '../router'

import proyecta from '@/api/proyecta'
// import * as mutations from './mutations'
// import * as actions from './actions'
import swal from 'sweetalert2'

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const store = new Vuex.Store({
  state: {
    authenticated: false,
    count: 1,
    proyectinos: [],
    proyectinosDjango: [],
    jwt: localStorage.getItem('t'),
    endpoints: {
      obtainJWT: 'http://localhost:8000/api/token/',
      refreshJWT: 'http://localhost:8000/api/token/refresh/',
      obtainProyectinos: 'http://localhost:8000/api/proyectinos/',
    }
  },
  getters: {
    getProyectinoId: (state) => (id) => {
      return state.proyectinos.find(proyectinos => proyectinos.id == id)
    }
  },
  mutations: {
    setProyectinos (state, proyectinos) {
      state.proyectinos = proyectinos
    },
    setProyectinosDjango (state, proyectinosDjango) {
      state.proyectinosDjango = proyectinosDjango
    },
    increment (state) {
      state.count++
    },
    updateToken(state, newToken){
      localStorage.setItem('t', newToken);
      localStorage.setItem('sesion', true);
      state.jwt = newToken;
    },
    updateAuthenticated(state){
      state.authenticated = true
    },
    deleteAuthenticated(state){
      state.authenticated = false
    },
    removeToken(state){
      localStorage.removeItem('t');
      localStorage.removeItem('sesion');
      state.jwt = null;
    }
  },
  actions:{
    prueba(){
        console.log("Mensaje con action");
    },
    fetchProyectinos({commit}){
      return new Promise((resolve)=> {
        proyecta.getProyectinos(proyectinos => {
          commit('setProyectinos', proyectinos)
          resolve()
        })
      })
    },
    fetchProyectinosDjango({commit}){
      axios.get(this.state.endpoints.obtainProyectinos, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('t')}`
        }
      })
      .then((response)=> {
      commit('setProyectinosDjango', response.data)
      console.log("Proyectinos de la API-DJANGO")
      console.log(response.data)
      }).catch((error)=>{
        console.log(error)
      })
    },
    logout({commit}){
      commit('removeToken')
      if(localStorage.getItem('sesion')){
        router.push('/')
      }else{
        router.push('/auth')
      }
    },
    obtainToken({commit}, credentials){
      return new Promise((resolve)=> {
        const username = credentials.username
        const password = credentials.password
        const payload = {
          'username': username,
          'password': password
        }
        axios.post(this.state.endpoints.obtainJWT, payload)
          .then((response)=> {
          commit('updateToken', response.data.access)
          commit('updateAuthenticated')
          router.push('/')
          }).catch((error)=>{
            console.log(error)
            swal.fire({
              title: 'Error!',
              text: 'User or password incorrect',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          })
        resolve()
      })
    },
    refreshToken(){
      const payload = {
        token: this.state.jwt
      }
      axios.post(this.state.endpoints.refreshJWT, payload)
        .then((response)=>{
            this.commit('updateToken', response.data.access)
          })
        .catch((error)=>{
            console.log(error)
          })
    }
    // inspectToken(){
    //   // WE WILL ADD THIS LATER
  }
})

export default store
