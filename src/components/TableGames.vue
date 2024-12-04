<script setup>
console.log("Inicio do console em TableGames.vue")
import { ref, onMounted } from 'vue'

const gameWinners = ref([])
const games = ref([])

onMounted(() => {
    indexGames()
})

// Requisição para renderizar todos os jogos na tabela
async function indexGames() {
    try {
        const response = await fetch('http://localhost:3000/games', {
            method: 'GET'
        })
        const data = await response.json()
        // Ordena os jogos pelo ID em ordem crescente
        games.value = data.sort((a, b) => a.id - b.id)
        // Cria o atributo .date para game e formata a data para DD/MM/YYYY
        games.value.forEach(game => {
            game.date = new Date(game.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
        })
        console.log('Games:', games.value)
        // Aguarda a renderização para setar as cores dos vencedores (se não, a função não encontra os elementos)
        setTimeout(setColorGameWinners, 0)
    } catch (error) {
        console.error('Fetch error:', error)
    }
}

// Requisição para deletar um jogo pelo botão da coluna Deletar Partida
async function deleteGame(id) {
    try {
        const response = await fetch(`http://localhost:3000/games/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log('Jogo apagado:', data)
        // Atualiza a tabela após deletar um jogo
        indexGames()
    } catch (error) {
        console.error('Fetch error:', error)
    }
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
            <tr v-for="game in games" :key="game.id" class="table-rows table-game-row">
                <td>{{ game.id }}</td>
                <td>{{ game.date }}</td>
                <td class="table-winner">{{ game.winner }}</td>
                <td><a>Ver resultado do jogo</a></td>
                <td><img class="table-delete-game" src="../assets/images/icon-delete.png" alt="Deletar Partida" @click="deleteGame(game.id)"></td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
.table-delete-game {
    width: 25px;
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
    border-spacing: 0 15px; /* Adiciona espaço entre as linhas da tabela */
}

.table-winner {
    font-weight: 900;
    font-size: 25px;
    height: 40px; /* A div do Empate estava ficando menor que os outros */
}

.table-rows {}

.table-first-row {}

.table-game-row {}
</style>