<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
    setup() {
        const route = useRoute()

        const isGameRoute = computed(() => route.path === '/game')
        const isHistoryRoute = computed(() => route.path === '/history')

        return {
            isGameRoute,
            isHistoryRoute
        }
    }
}
</script>

<template>
    <nav class="navbar">
        <div class="nav-equality">
            <router-link to="/">
                <img src="../assets/images/Logo_Blue.svg" alt="" class="logo-capim">
            </router-link>
        </div>
        <div class="nav-equality">
            <h1 class="game-title">JOGO DA VELHA</h1>
        </div>
        <div class="game-options">
            <router-link to="/game">
                <button :class="['buttons', 'game-button-new', { 'selected': isGameRoute }]">Novo Jogo</button>
            </router-link>
            <router-link to="/history">
                <button :class="['buttons', 'game-button-table', { 'selected': isHistoryRoute }]">Histórico de
                    Jogos</button>
            </router-link>
        </div>
    </nav>
</template>

<style scoped>
.buttons.selected {
    background-color: #bee41e;
    border: solid 2px #bee41e;
    color: #32205f;
}

.navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: sticky;
    background-color: white;
    width: 100vw;
    height: 100px;
    top: 0;
    z-index: 10;
    margin-bottom: 20px;
}

.nav-equality {
    width: 300px;
}

.logo-capim {}

.game-title {
    font-size: 2.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: ease 0.2s;
}

.game-title:hover {
    filter: drop-shadow(0 0 40px #b7e6ff);
}

.game-options {
    width: 300px;
    display: flex;
    gap: 20px;
}
</style>
