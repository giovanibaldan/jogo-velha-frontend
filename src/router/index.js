import { createRouter, createWebHistory } from 'vue-router'
import Game from '../components/Game.vue'
import TableGames from '../components/TableGames.vue'

const routes = [
    { path: '/', component: TableGames },
    { path: '/game/:id', component: Game }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router