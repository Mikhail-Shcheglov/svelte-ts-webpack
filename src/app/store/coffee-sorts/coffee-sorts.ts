import { writable } from 'svelte/store';

import { api } from 'src/app/api';
import { State } from './coffee-sorts.interfaces';

const DEFAULT_STATE: State = {
	loading: false,
	data: [],
};

function createSorts() {
	const { subscribe, update } = writable<State>(DEFAULT_STATE);

	return {
		subscribe,
		loadOne: async () => {
			update((state) => ({
				...state,
				loading: true,
			}));

			const sort = await api.loadRandomCoffeeSort();

			update((state) => ({
				...state,
				...(sort ? { data: state.data.concat(sort) } : {}),
				loading: false,
			}));
		},
	};
}

export const sorts = createSorts();
