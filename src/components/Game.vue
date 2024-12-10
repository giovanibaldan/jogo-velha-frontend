<script setup>
import { ref, onMounted } from 'vue'
import { rematchState, rematchId } from './TableGames.vue';
console.log("Inicio do console em Game.vue")

let playCounter = ref(0)
const cells = ref([])
const gameState = ref(Array(9).fill(''))
const winner = ref('')

const GAME_STATES = { // Mapper - Usar em verificações no lugar de strings soltas
    draw: 'Empate',
    winX: 'X',
    winO: 'O'
}

onMounted(() => {
    cells.value = document.querySelectorAll('.game-cell')
    // let gameRematchId = rematchId.value
    let rematchStateValue = rematchState.value
})

async function saveRematch(){
    try {
        let gameRematchId = rematchId.value
        const response = await fetch(`http://localhost:3000/games/${gameRematchId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                game_state: gameState.value,
                winner: winner.value,
                update_at: new Date()
            })
        })
        const data = await response.json()
        console.log('Revanche realizada:', data)
    } catch (error) {
        console.log('Erro no fetch:', error)
    }
}

async function saveGame() {
    try {
        const response = await fetch(`http://localhost:3000/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                game_state: gameState.value,
                winner: winner.value
            })
        })
        const data = await response.json()
        console.log('Novo jogo salvo com sucesso:', data)
    } catch (error) {
        console.log('Erro no fetch:', error)
    }
}

function setPlay(cell, index) {
    if (cell.innerHTML === '' && winner.value === '') {
        if (playCounter.value % 2 === 0) {
            cell.innerHTML = 'X'
            gameState.value[index] = 'X'
        } else {
            cell.innerHTML = 'O'
            gameState.value[index] = 'O'
        }
        playCounter.value++
        setCellColor(cell)
        if (gameState.value.filter(cell => cell !== '').length >= 5) { // Verificar a partir de 5 jogadas
            verifyWinner()
        }
    }
}

function setCellColor(cell) {
    if (cell.innerHTML == 'X') {
        cell.style.color = '#E25041'
    } else {
        cell.style.color = '#1BBC9B'
    }
}

function resetGame() {
    cells.value.forEach(cell => {
        cell.innerHTML = ''
    })
    gameState.value = Array(9).fill('')
    playCounter.value = 0
    winner.value = ''
}

// Função principal para verificar o vencedor
function verifyWinner() {
    verifyColumn()
    verifyRow()
    verifyDiagonal()
    verifyDraw()
    if (rematchState.value === true && winner.value !== '') {
        openWindowFinishedGame()
        saveRematch()
        rematchState.value = false
        rematchId.value = ''
    } else if (winner.value !== '') {
        openWindowFinishedGame()
        saveGame()
        console.log('Jogo finalizado:', gameState.value)
    } else {
        console.log('Verificando vencedor:', gameState.value)
    }
}

// Inicio das lógicas de verificação de vencedor
function verifyDraw() {
    if (winner.value === '' && gameState.value.every(cell => cell !== '')) {
        winner.value = GAME_STATES['draw'] // Testando Mapper
    }
}
function verifyColumn() {
    for (let i = 0; i < 3; i++) {
        if (gameState.value[i] === gameState.value[i + 3] && gameState.value[i] === gameState.value[i + 6] && gameState.value[i] !== '') {
            winner.value = gameState.value[i]
        }
    }
}
function verifyRow() {
    for (let i = 0; i < 3; i++) {
        if (gameState.value[i * 3] === gameState.value[i * 3 + 1] && gameState.value[i * 3] === gameState.value[i * 3 + 2] && gameState.value[i * 3] !== '') {
            winner.value = gameState.value[i * 3]
        }
    }
}
function verifyDiagonal() {
    if (gameState.value[0] === gameState.value[4] && gameState.value[0] === gameState.value[8] && gameState.value[0] !== '') {
        winner.value = gameState.value[0]
    } else if (gameState.value[2] === gameState.value[4] && gameState.value[2] === gameState.value[6] && gameState.value[2] !== '') {
        winner.value = gameState.value[2]
    }
}
// Fim

// Funções para abrir e fechar a tela de fim de jogo
function openWindowFinishedGame() {
    document.querySelector('.new-window-div').style.display = 'flex'
    const blackscreen = document.querySelector('.blackscreen')
    blackscreen.classList.add('visible')
}
function closeWindowFinishedGame() {
    document.querySelector('.new-window-div').style.display = 'none'
    const blackscreen = document.querySelector('.blackscreen')
    blackscreen.classList.remove('visible')
}
function handleFinishedNewGame() {
    resetGame()
    closeWindowFinishedGame()
}
// Fim

</script>

<template>
    <div class="game-div">

        <!-- Tabela do jogo -->
        <table class="game-table">
            <tr class="game-row" id="row-1">
                <td class="game-cell" id="cell-0" @click="setPlay($event.target, 0)"></td>
                <td class="game-cell" id="cell-1" @click="setPlay($event.target, 1)"></td>
                <td class="game-cell" id="cell-2" @click="setPlay($event.target, 2)"></td>
            </tr>
            <tr class="game-row" id="row-2">
                <td class="game-cell" id="cell-3" @click="setPlay($event.target, 3)"></td>
                <td class="game-cell" id="cell-4" @click="setPlay($event.target, 4)"></td>
                <td class="game-cell" id="cell-5" @click="setPlay($event.target, 5)"></td>
            </tr>
            <tr class="game-row" id="row-3">
                <td class="game-cell" id="cell-6" @click="setPlay($event.target, 6)"></td>
                <td class="game-cell" id="cell-7" @click="setPlay($event.target, 7)"></td>
                <td class="game-cell" id="cell-8" @click="setPlay($event.target, 8)"></td>
            </tr>
        </table>

        <!-- Tela de jogo finalizado -->
        <div class='new-window-div'>
            <nav class="new-window-nav">
                <button class="new-window-button-close" @click="closeWindowFinishedGame()">X</button>
            </nav>
            <h1 class="new-window-title">Jogo finalizado!</h1>
            <div v-if="rematchState == true && winner !== ''">
                <p class="game-finished-winner">Vencedor da revanche: {{ winner }}</p>
            </div>
            <div v-else-if="winner === 'X' || winner === 'O'">
                <p class="game-finished-winner">Vencedor da partida: {{ winner }}</p>
            </div>
            <div v-else-if="winner === GAME_STATES['draw']">
                <p class="game-finished-winner">Empate</p>
            </div>
            <div class="game-finished-buttons-div" v-if="winner !== ''">
                <router-link to="/game">
                    <button class="buttons game-button-new" @click="handleFinishedNewGame()">Novo Jogo</button>
                </router-link>
                <router-link to="/">
                    <button class="buttons game-button-table">Histórico de Jogos</button>
                </router-link>
            </div>
        </div>

        <!-- Tela preta de fundo -->
        <div class="blackscreen"></div>

    </div>
    <button class="game-reset" @click="resetGame">Recomeçar Partida</button>
</template>

<style scoped>
.game-div {
    display: flex;
    justify-content: center;
    align-items: center;
}

.game-table {
    border-collapse: collapse;
}

.game-row {}

.game-cell {
    width: 200px;
    height: 200px;
    border: solid 5px black;
    font-size: 130px;
    font-weight: 900;
    cursor: pointer;
    user-select: none;
    transition: ease 0.2s;
}

.game-cell:hover {
    background-color: #e0e8e9;
}

/* .new-window-div {
    z-index: 100;
    position: fixed;
    width: 20%;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    border: solid 3px black;
    display: none;
    flex-direction: column;
    justify-content: center;
}

.new-window-nav {
    display: flex;
    justify-content: flex-end;
    padding: 5px;
}

.new-window-button-close {
    border: none;
    box-shadow: 1px 1px 1px 1px black;
    border-radius: 5px;
    width: 40px;
    height: 30px;
    font-weight: 900;
    font-size: 20px;
    color: red;
    background-color: white;
    transition: ease 0.3s;
}

.new-window-title {
    margin: 0;
} */


.new-window-button-close:hover {
    background-color: rgb(250, 250, 250);
    box-shadow: none;
}

.game-finished-winner {
    font-size: 20px;
    font-weight: 600;
}

.game-finished-buttons-div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    /* margin-bottom: 20px; */
}

/* Todos estão no style.css global
.buttons{}
.game-button-new{}
.game-button-table{} */

.game-reset {
    transition: ease 0.3s;
    font-size: 15px;
    font-weight: 600;
    line-height: 100%;
    margin-bottom: 0;
    margin-top: 0;
    padding: 14px;
    border: 2px solid #32205f;
    border-radius: 32px;
    cursor: pointer;
    margin-top: 30px;
    background-color: rgba(255, 0, 0, 0.2);
}

.game-reset:hover {
    background-color: rgba(255, 0, 0, 0.3);
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

/* Estilização para fazer a interface famosa do jogo da velha */
#cell-0,
#cell-1,
#cell-2 {
    border-top: none;
}

#cell-6,
#cell-7,
#cell-8 {
    border-bottom: none;
}

#cell-0,
#cell-3,
#cell-6 {
    border-left: none;
}

#cell-2,
#cell-5,
#cell-8 {
    border-right: none;
}
</style>
