import './shared/styles/reset.less';
import './shared/styles/global.less';

import App from './app/app.svelte';

export const app = new App({
	target: document.body,
});
