
const _proyectinos = [
    {id: 0, nombre: 'Gerardo', especialidad: 'Sistemas'},
    {id: 1, nombre: 'Yery', especialidad: 'Sistemas'},
    {id: 2, nombre: 'Lesli', especialidad: 'Industrial'}
]


export default {
    getProyectinos (cb) {
        setTimeout(() => cb(_proyectinos), 3000)
    },
}