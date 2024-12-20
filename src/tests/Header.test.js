import Header from "../components/Header.vue";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../router'

const router = createRouter({
    history: createWebHistory(),
    routes
})

function headerFactory() {
    return mount(Header, {
        global: {
            plugins: [router]
        }
    })
}

describe('Header.vue', () => {
    it('renders Capim logo properly', () => {
        const wrapper = headerFactory()
        const capimLogo = wrapper.find('.logo-capim')
        expect(wrapper.find('.logo-capim').exists()).toBe(true)
        expect(capimLogo.attributes('src')).toBe('/src/assets/images/Logo_Blue.svg')
    })

    it('renders Header buttons', () => {
        const wrapper = headerFactory()
        expect(wrapper.find('.game-button-new').exists()).toBe(true)
        expect(wrapper.find('.game-button-table').exists()).toBe(true)
    })

    it('garantes when click Capim logo, goes to Home route', async () => {
        await router.push('/game')
        await router.isReady()
        const wrapper = headerFactory()
        await wrapper.find('.logo-capim').trigger('click')
        await router.push('/')
            .then(() => {
                expect(router.currentRoute.value.path).toBe('/')
            })
    })

    it('garantes new game button goes to /game route', async () => {
        await router.push('/')
        await router.isReady()
        const wrapper = headerFactory()
        await wrapper.find('.game-button-new').trigger('click')
        await router.push('/game')
            .then(() => {
                expect(router.currentRoute.value.path).toBe('/game')
            })
    })

    it('garantes history button goes to /history route', async () => {
        await router.push('/')
        await router.isReady()
        const wrapper = headerFactory()
        await wrapper.find('.game-button-table').trigger('click')
        await router.push('/history')
            .then(() => {
                expect(router.currentRoute.value.path).toBe('/history')
            })
    })
})