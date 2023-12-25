import './shared/styles/reset.scss';
import './shared/styles/global.scss';

import App from './app/app.svelte';

export const app = new App({
	target: document.body,
});
