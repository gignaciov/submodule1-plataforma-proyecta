<template>
<v-row>
<v-col>
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
            Miembros de la organización que actualmente se encuentran participando en actividades de la sección (directiva, proyectos, asambleas, jornadas de limpieza, etc.)
            </v-alert>
        </v-row>
        </v-col>
    </v-row>
    <v-row>
        <v-col lg="12">
            <v-row>

                <v-card
                max-width="450"
                class="mx-auto"
                >
                    <v-list three-line >
                        
                        <template v-for="(item, index) in items">
                        
                        <v-subheader
                            v-if="item.header"
                            :key="item.header"
                            v-text="item.header"
                        ></v-subheader>

                        <v-list-item
                            v-if="item.id"
                            :key="item.nombre"
                            @click="none"
                        >
                            <v-list-item-avatar>
                            <v-img :src="item.imagen"></v-img>
                            </v-list-item-avatar>
                
                            <v-list-item-content>
                            <v-list-item-title v-html="item.nombre + ' ' + item.apellido"></v-list-item-title>
                            <v-list-item-subtitle v-html="item.facultad + ' - ' + item.especialidad"></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider
                            :key="index"
                            :inset= false
                        ></v-divider>
                        </template>

                    </v-list>
                </v-card>
            </v-row>
        </v-col>
    </v-row>
</v-col>
</v-row>
</template>

<script>
export default {
    data: () => ({
    items: [
      { header: 'Today' },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
      },
    ],
    items2: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
        subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
      },
    ],
  }),
  methods: {
      none(){

      }
  },
  created() {
      
      this.$store.state.proyectinosDjango.forEach(element => {
         this.items.push(element) 
      });
      console.log("Listando items/listProyectinos")
      console.log(this.items)
      console.log("Listando state.proyectinos/listProyectinos")
      console.log(this.$store.state.proyectinosDjango)
  }
}
</script>