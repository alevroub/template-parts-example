import { eta, abc, path } from './dependencies.ts';
import { log, absolute_path } from './util.ts';

import routes from '../api/routes.ts';
import config from '../api/config.ts';

const { origin, port } = config;
const server = new abc();

eta.configure({
	views: 'frontend/components/'
});

server.static('/assets', '/frontend/assets');
server.static('/style', '/frontend/style');
server.static('/script', '/frontend/script');

for (const route of routes) {
	const { path, component, controller } = route;

	server.get(path, async ({ request, response }) => {
		const { head, data } : any = await controller(request);

		const page_file = await Deno.readTextFile(`frontend/pages/${component}`);
		const app_file = await Deno.readTextFile('frontend/components/app.eta');

		const page = eta.render(page_file, { request, head, data });
		const app = eta.render(app_file, { request, head, data, page });

		return app;
	});
}

server.start({ port });

log(`${origin}:${port}`, 'color: green');
