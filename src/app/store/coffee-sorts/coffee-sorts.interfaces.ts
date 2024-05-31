import { CoffeSort } from 'src/app/interfaces/coffee-sort';

/** Состояние списка загруженных сортов кофе. */
export interface State {
	/** Флаг загружается ли новый сорт кофе. */
	loading: boolean;
	/** Список загруженных сортов кофе. */
	data: CoffeSort[];
}
