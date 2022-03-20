import { eta, abc, path } from './dependencies.ts';
import { log, absolute_path } from './util.ts';

import routes from '../api/routes.ts';
import config from '../api/config.ts';

const port = config.port;
const server = new abc();

server.static('/assets', '/app/assets');
server.static('/style', '/app/style');
server.static('/script', '/app/script');

for (const route of routes) {
	const { path, component, controller } = route;

	server.get(path, async ({ request, response }) => {
		const { head, data } : any = await controller(request);

		return eta.renderFile(
			absolute_path(`../app/pages/${component}`), { request, response, head, data }
		);
	});
}

server.start({ port });

log(`server: ${port}`, 'color: green');
