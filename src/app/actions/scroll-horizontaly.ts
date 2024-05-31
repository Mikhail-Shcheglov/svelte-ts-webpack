/** Действия для перенаправления горизонтального скролла в вертикальный. */
export function scrollHorizontaly(node: HTMLElement) {
	const handleScroll = (evt: WheelEvent) => {
		evt.preventDefault();

		node.scrollLeft += evt.deltaY;
	};

	node.addEventListener('wheel', handleScroll);
}
