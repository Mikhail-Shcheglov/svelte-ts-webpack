export type Intensifier = 'muted';

/** Интерфейс сущности сорта кофе. */
export interface CoffeSort {
	/** Название смеси. */
	blend_name: string;
	/** Уникальный идентификатор. */
	id: number;
	intensifier: string;
	notes: string;
	origin: string;
	uid: string;
	variety: string;
}
