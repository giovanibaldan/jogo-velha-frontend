<script setup>
import { ref, onMounted } from 'vue'
console.log("Inicio do console em TableGames.vue")

const gameWinners = ref([])
const games = ref([])
const gameState = ref(null)
const gameId = ref('')

onMounted(() => {
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

// Funções para mostrar e fechar o estado final da partida
function showGameState(id) {
    getGameState(id)
    const blackscreen = document.querySelector('.blackscreen')
    blackscreen.classList.add('visible')
}

function closeGameState() {
    gameState.value = null
    const blackscreen = document.querySelector('.blackscreen')
    blackscreen.classList.remove('visible')
}
// Fim

// Funções para mostrar e fechar a janela de confirmação de deleção de jogo
function showDeleteGameWindow(id) {
    gameId.value = id
    const blackscreen = document.querySelector('.blackscreen')
    const newWindow = document.querySelector('.new-window-div')
    blackscreen.classList.add('visible')
    newWindow.style.display = 'flex'
}

function closeDeleteGameWindow() {
    const blackscreen = document.querySelector('.blackscreen')
    const newWindow = document.querySelector('.new-window-div')
    blackscreen.classList.remove('visible')
    newWindow.style.display = 'none'
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
    <div class="div-table-games">

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
                <td>
                    <router-link to="/game">
                        <button class="table-rematch" @click="playRematch(game.id)">Pedir revanche</button>
                    </router-link>
                </td>
                <td><img class="table-delete-game" src="../assets/images/icon-delete.png" alt="Deletar Partida"
                        @click="showDeleteGameWindow(game.id)"></td>
            </tr>
        </table>

        <!-- Janela de confirmar deleção de partida -->
        <div class="new-window-div">
            <div class="new-window-nav">
                <button class="new-window-button-close" @click="closeDeleteGameWindow()">X</button>
            </div>
            <h1 class="new-window-title">Deseja realmente deletar esta partida?</h1>
            <div class="new-window-buttons-div">
                <button class="new-window-button new-window-button-red" @click="deleteGame(gameId)">Deletar</button>
                <button class="new-window-button new-window-button-green" @click="closeDeleteGameWindow()">Cancelar</button>
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

.table-delete-game {
    width: 25px;
    cursor: pointer;
    transition: filter 0.3s;
}

.table-delete-game:hover {
    filter: brightness(0.7);
}

.div-game-state {
    align-self: flex-start;
    top: 30%;
    left: 50;
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

.blackscreen {
    z-index: 50;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 0.5s;
    pointer-events: none;
}

.blackscreen.visible {
    opacity: 1;
    pointer-events: auto;
}
</style>
