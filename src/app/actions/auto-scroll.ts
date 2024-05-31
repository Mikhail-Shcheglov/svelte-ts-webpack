import { afterUpdate, beforeUpdate } from 'svelte';

export function autoScroll(node: HTMLElement) {
	let needScroll = false;

	beforeUpdate(() => {
		if (node) {
			const scrollableDistance = node.scrollHeight - node.offsetHeight;
			needScroll = node.scrollTop > scrollableDistance - 20;
		}
	});

	afterUpdate(() => {
		if (needScroll) {
			node.scrollTo(0, node.scrollHeight);
		}
	});
}
