<script>
// export default {
//     name: "Header"
// }
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
                <button class="buttons game-new">Novo Jogo</button>
            </router-link>
            <router-link to="/">
                <button class="buttons game-table">Histórico de Jogos</button>
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
    cursor: pointer;
    transition: ease 0.2s;
}
.game-title:hover {
    filter: drop-shadow(0 0 40px #b7e6ff);
}
</style>