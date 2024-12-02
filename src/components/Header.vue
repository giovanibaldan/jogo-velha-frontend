<script>

</script>

<template>
    <nav class="navbar">
        <div class="nav-equality">
            <img src="../assets/images/Logo_Blue.svg" alt="" class="logo-capim">
        </div>
        <div class="nav-equality">
            <h1 class="game-title">JOGO DA VELHA</h1>
        </div>
        <div class="game-options">
            <button class="buttons game-new">Novo Jogo</button>
            <button class="buttons game-table">Histórico de Jogos</button>
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
.game-new{
    background-color: white;
    color: #32205f;
}
.game-table{
    background-color: #32205f;
    color: white;
}
.buttons:hover{
    background-color: #bee41e;
    border: solid 2px #bee41e;
    color: #32205f;
}
.buttons{
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
    filter: drop-shadow(0 0 40px #00a6ff);
}
</style>