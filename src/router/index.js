import { createRouter, createWebHistory } from 'vue-router'
import Game from '../components/Game.vue'
import History from '../components/History.vue'
import Home from '../components/Home.vue'

export const routes = [
    {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/game',
        name: "Game",
        component: Game
    },
    {
        path: '/history',
        name: 'History',
        component: History
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router