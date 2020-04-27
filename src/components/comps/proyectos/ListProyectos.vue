<template>
    <v-card
    class="mx-auto ma-2"
    max-width="344"
    outlined
    >
        <v-img
            v-bind:src="proyecto.imagen"
            height="200px"
        ></v-img>

        <v-card-title>
            {{proyecto.nombre_proyecto}}
        </v-card-title>

        <v-card-actions>
            
            <v-chip
            border="left"
            color="blue darken-3"
            dark
            >
                Estado: {{estado_actividad.find(element => element.id == proyecto.estado).estado}}
            </v-chip>

            <v-spacer></v-spacer>

            <v-chip
            border="left"
            color="blue-grey"
            dark
            >
            Tipo: {{tipo.find(element => element.id == proyecto.tipo).tipo}}
            </v-chip>

            <v-spacer></v-spacer>

            <v-btn
            icon
            @click="show = !show"
            >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
                {{proyecto.descripcion}}
            </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script>
export default {
    props: ["proyecto"],
    data() {
        return {
            show: false,
            estado_actividad: [
                {id: 1, estado: "Activo", descripcion: "Que está en planificación, ejecución o cierre."},
                {id: 2, estado: "Finalizado", descripcion: "La actividad ha concluido."},
            ],
            tipo: [
                {id: 1, tipo: "Difusión", descripcion: "Proyecto Social"},
                {id: 3, tipo: "Social", descripcion: "Proyectos que difunden las buenas prácticas de Gestión de Proyectos"},
            ],
        }
    }
};
</script>