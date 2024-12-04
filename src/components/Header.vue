<script>
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
                <button class="buttons game-button-new">Novo Jogo</button>
            </router-link>
            <router-link to="/">
                <button class="buttons game-button-table">Histórico de Jogos</button>
            </router-link>
        </div>
    </nav>
</template>

<style scoped>
.logo-capim{
    /* width: 100vw; */
}
.nav-equality{
    width: 300px;
}

.game-options{
    width: 300px;
    display: flex;
    gap: 20px;
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
    z-index: 100;
}
.game-title {
    font-size: 2.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: ease 0.2s;
}
.game-title:hover {
    filter: drop-shadow(0 0 40px #b7e6ff);
}
</style>