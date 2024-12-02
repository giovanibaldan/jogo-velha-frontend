<script setup>
import { ref, onMounted } from 'vue'

let playCounter = ref(0)
const cells = ref([])

function setPlay(cell) {
    if (cell.innerHTML === '') {
        if (playCounter.value % 2 === 0) {
            cell.innerHTML = 'X'
        } else {
            cell.innerHTML = 'O'
        }
        playCounter.value++
    }
    setCellColor(cell)
}

function setCellColor(cell) {
    if (cell.innerHTML == 'X') {
        cell.style.color = '#E25041'
    } else {
        cell.style.color = '#1BBC9B'
    }
}

function resetGame(){
    cells.value.forEach(cell => {
        cell.innerHTML = ''
    })
    playCounter.value = 0
}

onMounted(() => {
    cells.value = document.querySelectorAll('.game-cell')
})
</script>

<template>
    <div class="game-div">
        <table class="game-table">
            <tr class="game-row" id="row-1">
                <td class="game-cell" id="cell-0" @click="setPlay($event.target)"></td>
                <td class="game-cell" id="cell-1" @click="setPlay($event.target)"></td>
                <td class="game-cell" id="cell-2" @click="setPlay($event.target)"></td>
            </tr>
            <tr class="game-row" id="row-2">
                <td class="game-cell" id="cell-3" @click="setPlay($event.target)"></td>
                <td class="game-cell" id="cell-4" @click="setPlay($event.target)"></td>
                <td class="game-cell" id="cell-5" @click="setPlay($event.target)"></td>
            </tr>
            <tr class="game-row" id="row-3">
                <td class="game-cell" id="cell-6" @click="setPlay($event.target)"></td>
                <td class="game-cell" id="cell-7" @click="setPlay($event.target)"></td>
                <td class="game-cell" id="cell-8" @click="setPlay($event.target)"></td>
            </tr>
        </table>
        
    </div>
    <button class="game-reset" @click="resetGame()">Reiniciar Partida</button>
</template>

<style scoped>
.game-reset{
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
    background-color: rgba(255, 162, 0, 0.4);
}
.game-reset:hover{
    background-color: rgba(255, 162, 0, 0.7);
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