import { createRouter, createWebHistory } from 'vue-router'
import Game from '../components/Game.vue'
import TableGames from '../components/TableGames.vue'

const routes = [
    {
        path: '/',
        name: "TableGames",
        component: TableGames
    },
    {
        path: '/game',
        name: "Game",
        component: Game
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router