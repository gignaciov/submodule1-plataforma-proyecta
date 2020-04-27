<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <v-btn color="indigo" block @click=  "$store.dispatch('logout')">
          <v-icon lef>mdi-home</v-icon>     
          Logout
        </v-btn>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <div>
            <v-btn
              class="mx-1"
              color="primary"
              @click=  "$store.commit('increment')"
            >
              {{this.$store.state.count}}
            </v-btn>
          </div>
          <div>
            <v-btn
              class="mx-1"
              color="primary"
              @click=  "$store.commit('increment')"
            >
              {{ this.$store.getters.getProyectinoId(this.$store.state.count) }}
            </v-btn>
          </div>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <img
              v-if="loading"
              src="https://i.imgur.com/JfPpwOA.gif"
            >
            <ul v-else>
              <li v-for="proyectino in $store.state.proyectinos" :key="proyectino.id">{{proyectino.nombre}} - {{proyectino.especialidad}} </li>
            </ul>
            <ul>
              <h3>Proyectinos registrados en la base de datos</h3>
              <li v-for="proyectino2 in $store.state.proyectinosDjango" :key="proyectino2.id">{{proyectino2.nombre}} - {{proyectino2.apellido}} - {{proyectino2.especialidad}} </li>
            </ul>
            <ul>
              <h3>Proyectos registrados en la base de datos</h3>
              <li v-for="proyecto in $store.state.proyectosDjango" :key="proyecto.id">{{proyecto.nombre_proyecto}} - {{proyecto.imagen}} - {{proyecto.tipo}} </li>
            </ul>
          </v-col>  
        </v-row>

        <listProyectinos />
        
        <v-row
        justify="center"
        no-gutters>
          <v-col lg="12">
            <v-row>
              <v-alert
                color="primary"
                dark
                icon="card_travel"
                border="left"
              >
                Proyectos de los diferentes programas del portafolio anual de Proyecta UNI 2020.
              </v-alert>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-row>
              <listProyectos v-for="proyecto in $store.state.proyectosDjango" v-bind:key="proyecto.id" v-bind:proyecto="proyecto" />
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <br>
    <br>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import router from "../../router"
// import store from "@/store/index"
import { mapState } from 'vuex'
import ListProyectos from '../comps/proyectos/ListProyectos'
import ListProyectinos from '../comps/proyectinos/ListProyectinos'

  export default {
    computed: mapState(['status']),
    props: {
      source: String,

    },
    components: {
      ListProyectos,
      ListProyectinos,
    },
    // name: "Proyectinos",
    // mounted() {         
    //   this.checkLoggedIn();
    // },
    methods: {
      checkLoggedIn() {
        console.log("athenticated before into 'if'")
        console.log(localStorage.getItem('sesion'))
        if(localStorage.getItem('sesion')){
          this.loading = true
          this.$store.dispatch('fetchProyectinos')
          .then(() => this.loading = false)
        }else{
          router.push('/auth')
        }
      }
    },
    data() {
      return {
        drawer: false,  
        loading: false,
      }
    },
    created() {
      // console.log(this.$session)
      console.log(this.$store.state.authenticated)
      this.checkLoggedIn()
      console.log(this.$store.state.authenticated)
      this.$store.dispatch('fetchProyectinosDjango')
      this.$store.dispatch('fetchProyectosDjango')
      console.log(this.$store.state.proyectosDjango)
    }
  }
</script>