import Game from "../components/Game.vue";
import { mount } from "@vue/test-utils";
import { expect } from "vitest";
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "../router";

const router = createRouter({
    history: createWebHistory(),
    routes
})

function gameFactory() {
    return mount(Game, {
        global: {
            plugins: [router]
        }
    })
}

describe('Game.vue', () => {
    it('renders the game table', () => {
        const wrapper = gameFactory()
        expect(wrapper.find('.game-table').exists()).toBe(true)
    })

    it('sets plays on board', async () => {
        const wrapper = gameFactory()
        await wrapper.find('#cell-0').trigger('click')
        await wrapper.find('#cell-1').trigger('click')
        expect(wrapper.find('#cell-0').text()).toBe('X')
        expect(wrapper.find('#cell-1').text()).toBe('O')
    })

    it('verify the game winner', async () => {
        const wrapper = gameFactory()
        await wrapper.find('#cell-0').trigger('click') // X
        await wrapper.find('#cell-3').trigger('click') // O
        await wrapper.find('#cell-1').trigger('click') // X
        await wrapper.find('#cell-4').trigger('click') // O
        await wrapper.find('#cell-2').trigger('click') // X

        expect(wrapper.vm.winner).toBe('X')

        await wrapper.find('.game-reset').trigger('click')

        await wrapper.find('#cell-4').trigger('click') // X
        await wrapper.find('#cell-0').trigger('click') // O
        await wrapper.find('#cell-7').trigger('click') // X
        await wrapper.find('#cell-1').trigger('click') // O
        await wrapper.find('#cell-5').trigger('click') // X
        await wrapper.find('#cell-2').trigger('click') // O

        expect(wrapper.vm.winner).toBe('O')

    })

    it('checks if there was a draw in the game', async () => {
        const wrapper = gameFactory()
        await wrapper.find('#cell-2').trigger('click') // X
        await wrapper.find('#cell-0').trigger('click') // O
        await wrapper.find('#cell-3').trigger('click') // X
        await wrapper.find('#cell-1').trigger('click') // O
        await wrapper.find('#cell-4').trigger('click') // X
        await wrapper.find('#cell-5').trigger('click') // O
        await wrapper.find('#cell-7').trigger('click') // X
        await wrapper.find('#cell-6').trigger('click') // O
        await wrapper.find('#cell-8').trigger('click') // X

        expect(wrapper.vm.winner).toBe('Empate')
    })

    it('checks reset button', async () => {
        const wrapper = gameFactory()
    
        await wrapper.find('#cell-0').trigger('click') // X
        await wrapper.find('#cell-1').trigger('click') // O
        await wrapper.find('#cell-3').trigger('click') // X
    
        await wrapper.find('.game-reset').trigger('click')
    
        // Aguarda a próxima atualização do DOM
        await wrapper.vm.$nextTick()
    
        // Verifica se todas as células estão vazias
        expect(wrapper.vm.gameState[0]).toBe('')
        expect(wrapper.vm.gameState[1]).toBe('')
        expect(wrapper.vm.gameState[3]).toBe('')
    })

    it('checks new game button in finished window', async () => {
        const wrapper = gameFactory()

        await wrapper.find('#cell-4').trigger('click') // X
        await wrapper.find('#cell-0').trigger('click') // O
        await wrapper.find('#cell-7').trigger('click') // X
        await wrapper.find('#cell-1').trigger('click') // O
        await wrapper.find('#cell-5').trigger('click') // X
        await wrapper.find('#cell-2').trigger('click') // O

        await router.push('/game')
        await router.isReady()
        await wrapper.find('.game-button-new').trigger('click')
        await router.push('/game')
            .then(() => {
                expect(router.currentRoute.value.path).toBe('/game')
            })
    })

    it('checks history button in finished window', async () => {
        const wrapper = gameFactory()

        await wrapper.find('#cell-4').trigger('click') // X
        await wrapper.find('#cell-0').trigger('click') // O
        await wrapper.find('#cell-7').trigger('click') // X
        await wrapper.find('#cell-1').trigger('click') // O
        await wrapper.find('#cell-5').trigger('click') // X
        await wrapper.find('#cell-2').trigger('click') // O

        await router.push('/game')
        await router.isReady()
        await wrapper.find('.game-button-table').trigger('click')
        await router.push('/history')
            .then(() => {
                expect(router.currentRoute.value.path).toBe('/history')
            })
    })
})