import History from "../components/History.vue";
import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "../router";
import { expect } from "vitest";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

function historyFactory() {
    return mount(History, {
        global: {
            plugins: [router]
        },
    });
}

const MOCK_GAMES = [
    { id: 1, winner: 'O', game_state: ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'O', ''], created_at: '2024-12-04T16:11:38.865Z', updated_at: '2024-12-04T16:12:07.237Z' },
    { id: 2, winner: 'O', game_state: ['X', 'X', 'O', '', 'X', 'O', '', '', 'O'], created_at: '2024-12-04T16:11:47.147Z', updated_at: '2024-12-09T19:38:56.622Z' },
    { id: 4, winner: 'X', game_state: ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'O', ''], created_at: '2024-12-05T14:50:59.816Z', updated_at: '2024-12-05T14:50:59.816Z' },
    { id: 5, winner: 'X', game_state: ['X', 'O', 'O', 'O', 'X', 'X', 'X', '', 'X'], created_at: '2024-12-04T16:11:49.405Z', updated_at: '2024-12-04T16:15:33.372Z' },
    { id: 7, winner: 'Empate', game_state: ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'], created_at: '2024-12-04T16:11:51.149Z', updated_at: '2024-12-04T16:16:48.965Z' }
]

describe('History.vue', () => {
    let fetchMock;

    beforeEach(() => {
        fetchMock = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValueOnce(MOCK_GAMES).mockResolvedValueOnce(MOCK_GAMES[0]), // Mock para duas chamadas de fetch
        });
        global.fetch = fetchMock;
    });

    it('[#index] renders the history table body', async () => {
        const wrapper = historyFactory();

        await flushPromises(); // Aguarda todas as promises e renderizações serem resolvidas

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/games', { method: 'GET' });

        const rows = wrapper.findAll('.table-game-row');
        expect(wrapper.find('.table-main').exists()).toBe(true);
        expect(rows.length).toBe(5);
    });

    it('[#show] shows the game state details', async () => {
        const wrapper = historyFactory();

        await flushPromises(); // Aguarda a montagem inicial e as promessas serem resolvidas

        const showMatchButtons = wrapper.findAll('.table-view-game');
        await showMatchButtons[0].trigger('click'); // Dispara o clique no primeiro botão "Ver resultado do jogo"

        await flushPromises();

        // Verifica se o fetch foi chamado com a URL esperada
        const expectedURL = `http://localhost:3000/games/${MOCK_GAMES[0].id}`;
        expect(fetchMock).toHaveBeenCalledWith(expectedURL, { method: 'GET' });
        expect(wrapper.find('#windowGameState').exists()).toBe(true);
    });

    it('renders rematch window', async () => {
        const wrapper = historyFactory();

        await flushPromises();

        const showWindowRematch = wrapper.findAll('.table-rematch');
        await showWindowRematch[0].trigger('click');

        await flushPromises();

        expect(wrapper.find('#windowRematch').exists()).toBe(true);
    })

    it('[#update] starts a rematch', async () => {
        const wrapper = historyFactory();

        await flushPromises();

        const showWindowRematch = wrapper.findAll('.table-rematch');
        await showWindowRematch[0].trigger('click');
        await flushPromises();
        expect(wrapper.find('#windowRematch').exists()).toBe(true);

        expect(wrapper.find('#buttonPlayRematch').exists()).toBe(true);
        await wrapper.find('#buttonPlayRematch').trigger('click');
        await flushPromises();
        expect(wrapper.vm.rematchState).toBe(true);
        expect(wrapper.vm.rematchId).toBe(MOCK_GAMES[0].id);
        await router.push('/game')
            .then(() => {
                expect(router.currentRoute.value.path).toBe('/game')
            })
    })

    it('[#destroy] deletes a game', async () => {
        const wrapper = historyFactory();

        await flushPromises();

        const showWindowDeleteGame = wrapper.findAll('.table-delete-game-div');
        await showWindowDeleteGame[0].trigger('click');
        await flushPromises();
        expect(wrapper.find('#windowDelete').exists()).toBe(true);

        expect(wrapper.find('#buttonDeleteGame').exists()).toBe(true);
        await wrapper.find('#buttonDeleteGame').trigger('click');
        await flushPromises();

        expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/games/${MOCK_GAMES[0].id}`, { method: 'DELETE' });

        await flushPromises();
        console.log(wrapper.vm.games);

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/games', { method: 'GET' });

    });

});
