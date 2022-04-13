import { development_mode } from '../server/util.ts';

export default {
	port: development_mode ? 3000 : 80,

	get origin() {
		return development_mode ? `http://localhost:${this.port}` : 'https://alejandro.deno.dev';
	},

	get origins_allowed() {
		return [this.origin];
	},

	sanity: {
		id: '32td7jzv',
		version: '2022-03-01',
		dataset: 'production',
		cdn: true,
	},
};
