import History from "../components/Game.vue";
import { mount } from "@vue/test-utils";
import { expect } from "vitest";
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "../router";

const router = createRouter({
    history: createWebHistory(),
    routes
})

function historyFactory() {
    return mount(History, {
        global: {
            plugins: [router]
        }
    })
}

describe('History.vue', () => {
    it('renders the history table body', () => {
        const wrapper = historyFactory()
        // expect(wrapper.find(''))

    })
})