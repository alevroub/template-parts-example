import { eta, abc, path } from './dependencies.ts';
import { log, absolute_path } from './util.ts';
import { cors } from './middleware.ts';

import routes from '../api/routes.ts';
import config from '../api/config.ts';

const server = new abc();

eta.configure({
	views: 'frontend/components/',
});

server.static('/assets', '/frontend/assets');
server.static('/style', '/frontend/style');
server.static('/script', '/frontend/script');

for (const route of routes) {
	async function get_handler({ request, response }) {
		const { head, data }: any = await route.controller(request);

		const page_file = await Deno.readTextFile(`frontend/pages/${route.page}`);
		const app_file = await Deno.readTextFile('frontend/components/app.eta');

		const page = eta.render(page_file, { request, head, data });
		const app = eta.render(app_file, { request, head, data, page });

		return app;
	}

	async function post_handler({ request, response }) {
		const { data }: any = await route.controller(request);
		return data;
	}

	server.get(route.path, get_handler);
	server.post(route.path, post_handler, cors);
}

server.start({ port: config.port });

log(`Port: ${config.port}`, 'blue');
log(`Origin: ${config.origin}`, 'blue');