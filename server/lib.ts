import { development_mode } from './util.ts';

import api_config from '../api/config.ts';
import api_routes from '../api/routes.ts';

export const routes = api_routes.map(route => ({
	...route, controller: route.controller || (async () => ({ data: {}, meta: {} }))
}))

export const config = Object.assign(api_config, {
	port: development_mode ? api_config.port : 80,

	get origin() {
		return development_mode ? `http://localhost:${this.port}` : api_config.url;
	},

	get origins_allowed() {
		return [this.origin];
	}
})