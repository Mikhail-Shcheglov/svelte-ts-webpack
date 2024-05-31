export type Intensifier = 'muted';

/** Интерфейс сущности сорта кофе. */
export interface CoffeSort {
	/** Название смеси. */
	blend_name: string;
	/** Инкрементированный идентификатор. */
	id: number;
	/** Насыщенность. */
	intensifier: string;
	/** Теги сорта кофе. */
	notes: string;
	/** Страна происхождения. */
	origin: string;
	/** Уникальный идентификатор. */
	uid: string;
	/** Разоновидность. */
	variety: string;
}
