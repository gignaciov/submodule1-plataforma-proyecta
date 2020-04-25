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
          </v-col>  
        </v-row>
      </v-container>
    </v-content>
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
import { mapState } from 'vuex';

  export default {
    computed: mapState(['status']),
    props: {
      source: String,
    },
    // name: "Proyectinos",
    // mounted() {         
    //   this.checkLoggedIn();
    // },
    methods: {
      checkLoggedIn() {
        console.log("athenticated before into 'if'")
        console.log(this.$store.state.authenticated)
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
        drawer: null,  
        loading: false
      }
    },
    created() {
      // console.log(this.$session)
      console.log(this.$store.state.authenticated)
      this.checkLoggedIn()
      console.log(this.$store.state.authenticated)
      this.$store.dispatch('fetchProyectinosDjango')
    }
  }
</script>