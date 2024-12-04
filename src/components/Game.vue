<script setup>
console.log("Inicio do console em Game.vue")
import { ref, onMounted } from 'vue'

let playCounter = ref(0)
const cells = ref([])
const gameState = ref(Array(9).fill(''))
const winner = ref('')

onMounted(() => {
    cells.value = document.querySelectorAll('.game-cell')
})

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
        if (gameState.value.filter(cell => cell !== '').length >= 5) { // Verificar a partir de 5 jogdas
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

// Verificação de vencedor (Feito no back-end em Ruby anteriormente)
function verifyWinner() {
    verifyColumn()
    verifyRow()
    verifyDiagonal()
    verifyDraw()
    verifyAbandoned() // Verificar se ainda vai ser necessário
    if (winner.value !== '') {
        openWindowFinishedGame()
        console.log('Jogo finalizado:', gameState.value)
    } else {
        console.log('Verificando vencedor:', gameState.value)
    }
    }

// Verificar se ainda vai ser necessário
function verifyAbandoned() {
    if (gameState.value.filter(cell => cell !== '').length < 5) {
        winner.value = ''
    }
}

function verifyDraw() {
    if (winner.value === '' && gameState.value.every(cell => cell !== '')) {
        winner.value = 'Draw'
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

function openWindowFinishedGame() {
    document.querySelector('.game-finished-div').style.display = 'flex'
}

function closeWindowFinishedGame() {
    document.querySelector('.game-finished-div').style.display = 'none'
}

function handleFinishedNewGame() {
    resetGame()
    closeWindowFinishedGame()
}


</script>

<template>
    <div class="game-div">
        <div class='game-finished-div'>
            <nav class="game-finished-nav">
                <button class="game-finished-close" @click="closeWindowFinishedGame()">X</button>
            </nav>
            <h1 class="game-finished-title">Jogo finalizado!</h1>
            <div v-if="winner === 'X' || winner === 'O'">
                <p class="game-finished-winner">Vencedor: {{ winner }}</p>
            </div>
            <div v-if="winner === 'Draw'">
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
    </div>
    <button class="game-reset" @click="resetGame">Recomeçar Partida</button>
</template>

<style scoped>
.game-finished-winner {
    font-size: 20px;
    font-weight: 600;
}
.game-finished-div {
    position: fixed;
    width: 20%;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    /* padding: 10; */
    border: solid 3px black;
    display: none;
    flex-direction: column;
    justify-content: center;

}

.game-finished-nav {
    display: flex;
    justify-content: flex-end;
    padding: 5px;

}

.game-finished-close {
    border: solid 1px rgb(230, 230, 230);
    border-radius: 5px;
    width: 40px;
    height: 30px;
    font-weight: 900;
    font-size: 20px;
    color: red;
    background-color: white;
}

.game-finished-title {
    margin: 0;
}

.game-finished-buttons-div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.game-reset {
    /* position: absolute;
    top: 50vh;
    right: 20vw; */
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

.game-div {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.game-table {
    border-collapse: collapse;
}

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