import Home from '../components/Home.vue'
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../router'

const router = createRouter({
    history: createWebHistory(),
    routes
})

function homeFactory() {
    return mount(Home, {
        global: {
            plugins: [router]
        }
    })
}

describe('Home.vue', () => {
    it('renders Capim logo properly', () => {
        const wrapper = homeFactory()
        const capimLogo = wrapper.find('.home-nav-image')
        expect(wrapper.find('.home-nav-image').exists()).toBe(true)
        expect(capimLogo.attributes('src')).toBe('/src/assets/images/Logo_Blue.svg')
    })

    it('renders the home page title correctly', () => {
        const wrapper = homeFactory()
        expect(wrapper.find('.home-title').text()).toBe('JOGO DA VELHA')
    })

    it('renders project description properly', () => {
        const wrapper = homeFactory()
        expect(wrapper.find('.home-desc').text()).toBe('Projeto desenvolvido para o treinamento do primeiro contato com a stack de desenvolvimento da Capim')
    })

    it('renders profile image properly', () => {
        const wrapper = homeFactory();
        const profileImage = wrapper.find('.home-image');
        expect(profileImage.exists()).toBe(true);
        expect(profileImage.attributes('src')).toBe('/src/assets/images/home-image.jpg');
    });

    it('renders the new game button properly', () => {
        const wrapper = homeFactory()
        expect(wrapper.find('.game-button-new').exists()).toBe(true)
    })

    it('renders the history button properly', () => {
        const wrapper = homeFactory()
        expect(wrapper.find('.game-button-table').exists()).toBe(true)
    })

    it('new game button goes to /game route', async () => {
        await router.push('/')  // Primeiro, garante que estamos na rota inicial
        await router.isReady()  // Aguarda até que o roteador esteja pronto
    
        const wrapper = homeFactory()
        await wrapper.find('.game-button-new').trigger('click')  // Clica no botão
    
        // Usa a promessa retornada por router.push para aguardar a navegação
        await router.push('/game').then(() => {
            expect(router.currentRoute.value.path).toBe('/game')  // Verifica se a navegação foi para /game
        })
    })

    it('history button goes to /history route', async () => {
        await router.push('/')
        await router.isReady()
        const wrapper = homeFactory()
        await wrapper.find('.game-button-table').trigger('click') 
        await router.push('/history').then(() => {
            expect(router.currentRoute.value.path).toBe('/history')
        })
    })

})
