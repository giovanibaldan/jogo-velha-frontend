import { mount } from '@vue/test-utils'
import Home from '../components/Home.vue'
import { expect } from 'vitest'

describe('Home.vue', () => {
    it('renders the home page correctly', () => {
        const wrapper = mount(Home)
        expect(wrapper.find('.home-title').text()).toBe('JOGO DA VELHA')
    })

    it('renders home icon properly', () => {
        const wrapper = mount(Home)
        expect(wrapper.find('.home-nav-image').exists()).toBe(true)
    })
})