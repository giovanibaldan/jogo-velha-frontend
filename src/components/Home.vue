<script>
</script>

<template>
    <div class="home-page-div loading">
        <nav class="home-nav">
            <img src="../assets/images/Logo_Blue.svg" alt="" class="home-nav-image">
        </nav>
        <div class="home-body">
            <div class="home-content animated-content">
                <h1 class="home-title">JOGO DA VELHA</h1>
                <h3 class="home-desc">Projeto desenvolvido para o treinamento do primeiro contato com a stack de
                    desenvolvimento da Capim</h3>
                <div class="home-buttons-div">
                    <router-link to="/game">
                        <button class="buttons game-button-new home-buttons">Novo Jogo</button>
                    </router-link>
                    <router-link to="/history">
                        <button class="buttons game-button-table home-buttons">Histórico de Jogos</button>
                    </router-link>
                </div>
            </div>
            <div class="home-image-div animated-image">
                <img src="../assets/images/home-image.jpg" alt="" class="home-image">
                <p class="home-image-text"></p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home-page-div {
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
}

.home-nav {
    width: 100%;
    padding-top: 40px;
    padding-bottom: 40px;
}

.home-nav-image {
    width: 200px;
}

.home-body {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px
}

.home-content {
    width: 500px;
}

.home-title {
    font-size: 40px;
}

.home-desc {
    padding-right: 80px;
    padding-left: 80px;
    margin-bottom: 40px;
}

.home-buttons-div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
}

.home-buttons {
    width: 250px;
}

.home-image-div {}

.home-image {
    width: 500px;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    box-shadow: 0px 1px 20px #32205f25;
    transition: ease 3s;
}

.home-image:hover {
    border-radius: 72% 28% 29% 71% / 22% 43% 57% 78%;
    box-shadow: 0px 1px 30px #32205fa4;
}

.home-image-text {}

/* ANIMAÇÕES */
@keyframes slideInFromRight {
    0% {
        transform: translateX(5%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideInFromBottom {
    0% {
        transform: translateY(5%);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

.animated-content {
    animation: slideInFromBottom 1.5s ease-out;
}

.animated-image {
    animation: slideInFromRight 1.5s ease-out;
}
</style>