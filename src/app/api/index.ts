import { CoffeSort } from '../interfaces/coffee-sort';
import { BASE_URL } from './constants';

/** Метод загрузки случайного сорта кофе. */
const loadRandomCoffeeSort = async (): Promise<CoffeSort | null> => {
	try {
		const response = await fetch(`${BASE_URL}/coffee/random_coffee`);
		const data: CoffeSort = await response.json();

		return data;
	} catch (e) {
		console.error(e);

		return null;
	}
};

const api = {
	loadRandomCoffeeSort,
};

export { api };
