import { development_mode } from './util.ts';
import { render } from './dependencies.ts';

import api_config from '../api/config.js';
import api_routes from '../api/routes.js';

import frontend_meta from '../frontend/app/meta.ts';
import frontend_filters from '../frontend/app/filters.ts';

export const routes = api_routes.map(route => ({
	...route,
	controller: route.controller || (async () => ({ data: {}, meta: {} })),
}));

export const config = Object.assign(api_config, {
	port: development_mode ? api_config.port : 80,

	get origin() {
		return development_mode ? `http://localhost:${this.port}` : api_config.url;
	},

	get origins_allowed() {
		return [this.origin];
	},
});

export function app_meta(route_meta: object, route_url: URL) {
	const computed_meta = {
		url: config.origin + route_url.pathname,
	};

	return {
		...frontend_meta,
		...route_meta,
		...computed_meta,
	};
}

export function app_render(template: string, data: object) {
	const render_options = {
		include_path: 'frontend/components/',
	};

	return render(template, data, frontend_filters, render_options);
}