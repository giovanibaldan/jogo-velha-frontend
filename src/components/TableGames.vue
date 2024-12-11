<script setup>
import { ref, onMounted } from 'vue'
import Header from './Header.vue';
console.log("Inicio do console em TableGames.vue")

const gameWinners = ref([])
const games = ref([])
const gameState = ref(null)
const gameId = ref('')
const windowDelete = ref(false)
const windowRematch = ref(false)
let blackscreen

onMounted(() => {
    blackscreen = document.querySelector('.blackscreen')
    indexGames()
        .then(() => { // Aguarda a renderização para setar as cores dos vencedores (se não, a função não encontra os elementos)
            setColorGameWinners()
        })
})

// Requisição para renderizar todos os jogos na tabela
async function indexGames() {
    try {
        const response = await fetch('http://localhost:3000/games', {
            method: 'GET'
        })
        const data = await response.json() // Ordena os jogos pelo ID em ordem crescente
        games.value = data.sort((b, a) => a.id - b.id)
        games.value.forEach(game => { // Cria o atributo .date para game e formata a data para DD/MM/YYYY
            game.date = new Date(game.updated_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
        })
        console.log('Games:', games.value)
    } catch (error) {
        console.error('Fetch error:', error)
    }
}

async function deleteGame(id) {
    try {
        const response = await fetch(`http://localhost:3000/games/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log('Jogo apagado:', data)
        indexGames()
        closeDeleteGameWindow()
    } catch (error) {
        console.error('Fetch error:', error)
    }
}

async function getGameState(id) {
    try {
        const response = await fetch(`http://localhost:3000/games/${id}`, {
            method: 'GET'
        })
        const data = await response.json()
        gameState.value = data.game_state
        console.log('Game State:', gameState.value)
    } catch (error) {
        console.error('Fetch error:', error)
    }
}

function showBlackScreen() {
    blackscreen.classList.add('visible')
}

function hideBlackScreen() {
    blackscreen.classList.remove('visible')
}

// Funções para mostrar e fechar o estado final da partida
function showGameState(id) {
    getGameState(id)
    showBlackScreen()
}

function closeGameState() {
    gameState.value = null
    hideBlackScreen()
}

// Funções para mostrar e fechar a janela de confirmação de deleção de jogo
function showDeleteGameWindow(id) {
    windowDelete.value = true
    gameId.value = id
    showBlackScreen()
}

function closeDeleteGameWindow() {
    windowDelete.value = false
    hideBlackScreen()
}

// Funções para mostrar e fechar a janela de confirmação de revanche
function showRematchWindow(id) {
    windowRematch.value = true
    gameId.value = id
    showBlackScreen()
}

function closeRematchWindow() {
    windowRematch.value = false
    hideBlackScreen()
}

// Função para setar as cores dos vencedores e modificar o tamanho da fonte do Empate
function setColorGameWinners() {
    gameWinners.value = document.querySelectorAll('.table-winner')
    gameWinners.value.forEach(winner => {
        if (winner.innerHTML === 'X') {
            winner.style.color = '#E25041'
        } else if (winner.innerHTML === 'O') {
            winner.style.color = '#1BBC9B'
        } else if (winner.innerHTML === 'Empate') {
            winner.style.fontSize = '18px'
        }
    })
}
</script>

<script>
export let rematchState = ref(false)
export let rematchId = ref("")

function playRematch(id) {
    rematchId.value = id
    rematchState.value = true
}
</script>

<template>
    <Header />

    <div class="div-table-games loading">

        <!-- Tabela de histórico de jogos -->
        <table class="table-main">
            <tr class="table-rows table-first-row">
                <th>ID da Partida</th>
                <th>Data</th>
                <th>Vencedor</th>
                <th>Detalhes da partida</th>
                <th>Revanche</th>
                <th>Deletar partida</th>
            </tr>
            <tr v-for="game in games" :key="game.id" class="table-rows table-game-row">
                <td>{{ game.id }}</td>
                <td>{{ game.date }}</td>
                <td class="table-winner">{{ game.winner }}</td>
                <td><button class="table-view-game" @click="showGameState(game.id)">Ver resultado do jogo</button></td>
                <td><button class="table-rematch" @click="showRematchWindow(game.id)">Pedir revanche</button></td>
                <td class="table-delete-row">
                    <div class="table-delete-game-div" @click="showDeleteGameWindow(game.id)">
                        <img class="table-delete-game-img" src="../assets/images/icon-trash.png" alt="Deletar Partida">
                    </div>
                </td>
            </tr>
        </table>

        <!-- Janela de iniciar revanche -->
        <div v-if="windowRematch" class="new-window-div">
            <div class="new-window-nav">
                <button class="new-window-button-close" @click="closeRematchWindow()">X</button>
            </div>
            <h1 class="new-window-title">Iniciar revanche?</h1>
            <div class="new-window-buttons-div">
                <router-link to="/game">
                    <button class="new-window-button new-window-button-green"
                        @click="playRematch(gameId)">Iniciar</button>
                </router-link>
                <button class="new-window-button new-window-button-red" @click="closeRematchWindow()">Cancelar</button>
            </div>
        </div>

        <!-- Janela de confirmar deleção de partida -->
        <div v-if="windowDelete" class="new-window-div">
            <div class="new-window-nav">
                <button class="new-window-button-close" @click="closeDeleteGameWindow()">X</button>
            </div>
            <h1 class="new-window-title">Deseja realmente deletar essa partida?</h1>
            <div class="new-window-buttons-div">
                <button class="new-window-button new-window-button-red" @click="deleteGame(gameId)">Deletar</button>
                <button class="new-window-button new-window-button-green"
                    @click="closeDeleteGameWindow()">Cancelar</button>
            </div>
        </div>

        <!-- Janela final da partida -->
        <div v-if="gameState" class="div-game-state">
            <nav class="board-game-state-nav">
                <button class="new-window-button-close" @click="closeGameState()">X</button>
            </nav>
            <div class="board-game-state">
                <div class="board-game-row" v-for="(rowIndex) in [0, 1, 2]" :key="rowIndex">
                    <div class="board-game-cell"
                        v-for="(cell, cellIndex) in gameState.slice(rowIndex * 3, rowIndex * 3 + 3)" :key="cellIndex">{{
                            cell }}</div>
                </div>
            </div>
        </div>

        <!-- Fundo preto-->
        <div class="blackscreen"></div>

    </div>
</template>

<style scoped>
.div-table-games {
    width: 100vw;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.table-main {
    width: 70%;
    border: solid 2px #32205f;
    border-radius: 20px;
    padding: 20px;
    border-spacing: 0 15px;
    /* Adiciona espaço entre as linhas da tabela */
}

.table-rows {}

.table-first-row {}

.table-game-row {}

.table-winner {
    font-weight: 900;
    font-size: 25px;
    color: rgb(117, 76, 0);
    height: 40px;
    /* A div do Empate estava ficando menor que os outros */
}

.table-view-game {
    width: 150px;
    height: 30px;
    color: #32205f;
    background-color: white;
    border: solid 1px #32205f;
    border-radius: 10px;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
    transition: ease 0.3s;
}

.table-view-game:hover,
.table-rematch:hover {
    background-color: #bee41e;
    border: solid 1px #bee41e;
    color: #32205f;
}

.table-rematch {
    width: 110px;
    height: 30px;
    color: #ffffff;
    background-color: #32205f;
    border: solid 1px #32205f;
    border-radius: 10px;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
    transition: ease 0.3s;
}

.table-delete-row {
    display: flex;
    justify-content: center;
    align-items: center;
}

.table-delete-game-div {
    height: 30px;
    width: 60px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ec2300;
    cursor: pointer;
    transition: ease 0.3s;
}

.table-delete-game-div:hover {
    filter: brightness(0.85);
}

.table-delete-game-img {
    height: 18px;
    cursor: pointer;
    filter: invert();
}

.div-game-state {
    align-self: flex-start;
    top: 20%;
    z-index: 100;
    position: fixed;
    width: 400px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    border: solid 3px black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.board-game-state-nav {
    display: flex;
    align-self: flex-end;
    padding: 5px;
}

.board-game-state {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: 0;
    margin: 20px;
}

.board-game-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.board-game-cell {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px black;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    transition: ease 0.2s;
}
</style>
