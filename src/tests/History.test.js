import History from "../components/History.vue";
import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "../router";

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
            json: vi.fn().mockResolvedValue(MOCK_GAMES),
        });
        global.fetch = fetchMock;
    });

    it('renders the history table body', async () => {
        const wrapper = historyFactory();

        // Aguarda todas as promises e renderizações serem resolvidas
        await flushPromises();

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/games', { method: 'GET' });

        const rows = wrapper.findAll('tr.table-game-row');
        expect(wrapper.find('.table-main').exists()).toBe(true);
        expect(rows.length).toBe(5);
    });
});
