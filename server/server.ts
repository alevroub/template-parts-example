import { eta, abc, path } from './dependencies.ts';
import { log, absolute_path } from './util.ts';

const port = 3000;

const server = new abc();
const routes = new Map();

eta.configure({
	views: absolute_path('../app/pages/'),
	async: true
});

// routes.set('/:page', 'page.eta');
routes.set('/', 'index.eta');

for (const route of routes.entries()) {
	const [route_path, route_template] = route;

	server.get(route_path, ({ request, response }) => {
		return eta.renderFile(absolute_path(`../app/pages/${route_template}`), { request, response });
	});
}

server.start({ port });

log(`server: ${port}`);
