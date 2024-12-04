<script setup>
console.log("Inicio do console em TableGames.vue")
import { ref, onMounted } from 'vue'

const gameWinners = ref([])

onMounted(() => {
    gameWinners.value = document.querySelectorAll('.table-winner')
    setColorGameWinners()
})

function setColorGameWinners() {
    gameWinners.value.forEach(winner => {
        if (winner.innerHTML === 'X') {
            winner.style.color = '#E25041'
        } else if (winner.innerHTML === 'O') {
            winner.style.color = '#1BBC9B'
        }
    })
}
</script>

<template>
    <div class="div-table-games">
        <table class="table-main">
            <tr class="table-rows table-first-row">
                <th>ID da Partida</th>
                <th>Data</th>
                <th>Vencedor</th>
                <th>Estado Final da Partida</th>
                <th>Deletar partida</th>
            </tr>
            <tr class="table-rows table-game-row">
                <td>1</td>
                <td>03/12/2024</td>
                <td class="table-winner">X</td>
                <td><a>Ver resultado do jogo</a></td>
                <td><img class="table-delete-game" src="../assets/images/icon-delete.png" alt="Deletar Partida"></td>
            </tr>
            <tr class="table-rows table-game-row">
                <td>2</td>
                <td>03/12/2024</td>
                <td class="table-winner">O</td>
                <td><a>Ver resultado do jogo</a></td>
                <td><img class="table-delete-game" src="../assets/images/icon-delete.png" alt="Deletar Partida"></td>
            </tr>
            <tr class="table-rows table-game-row">
                <td>3</td>
                <td>03/12/2024</td>
                <td class="table-winner">X</td>
                <td><a>Ver resultado do jogo</a></td>
                <td><img class="table-delete-game" src="../assets/images/icon-delete.png" alt="Deletar Partida"></td>
            </tr>
            <tr class="table-rows table-game-row">
                <td>4</td>
                <td>03/12/2024</td>
                <td class="table-winner">O</td>
                <td><a>Ver resultado do jogo</a></td>
                <td><img class="table-delete-game" src="../assets/images/icon-delete.png" alt="Deletar Partida"></td>
            </tr>
            <tr class="table-rows table-game-row">
                <td>5</td>
                <td>03/12/2024</td>
                <td class="table-winner">X</td>
                <td><a>Ver resultado do jogo</a></td>
                <td><img class="table-delete-game" src="../assets/images/icon-delete.png" alt="Deletar Partida"></td>
            </tr>
            <tr class="table-rows table-game-row">
                <td>6</td>
                <td>03/12/2024</td>
                <td class="table-winner">O</td>
                <td><a>Ver resultado do jogo</a></td>
                <td><img class="table-delete-game" src="../assets/images/icon-delete.png" alt="Deletar Partida"></td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
.table-delete-game {
    width: 20px;
    cursor: pointer;
    transition: filter 0.3s;
}

.table-delete-game:hover {
    filter: brightness(0.7);
}

.div-table-games {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.table-main {
    width: 60%;
    border: solid 2px #32205f;
    border-radius: 20px;
    padding: 20px;
    border-spacing: 0 5px; /* Adiciona espaço entre as linhas da tabela */
}

.table-winner {
    font-weight: 900;
    font-size: 25px;
}

.table-rows {}

.table-first-row {}

.table-game-row {}
</style>