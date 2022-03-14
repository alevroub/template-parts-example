import { eta, abc, path } from './dependencies.ts';
import { log, absolute_path } from './util.ts';

const port = 3000;

const server = new abc();
const routes = new Map();

routes.set('/', 'index.eta');

server.static('/style', '../app/style');
server.static('/script', '../app/script');

for (const route of routes.entries()) {
	const [route_path, route_template] = route;

	server.get(route_path, ({ request, response }) => {
		/*
			alternately, dynamically import a compiled .svelte js and $$render() passing props
		*/

		const head = { title: "hello from deno" };

		return eta.renderFile(absolute_path(`../app/pages/${route_template}`), { request, response, head });
	});
}

server.start({ port });

log(`server: ${port}`);
