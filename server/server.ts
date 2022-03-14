import { eta, abc, path } from './dependencies.ts';
import { log, absolute_path } from './util.ts';
import { index_controller } from './controllers.ts'

const port = 3000;
const server = new abc();

server.static('/style', '../app/style');
server.static('/script', '../app/script');

const routes = [
	{ path: '/', component: 'index.eta', controller: index_controller }
];

for (const route of routes) {
	const { path, component, controller } = route;

	server.get(path, async ({ request, response }) => {
		const { head, data } : any = await controller.call(this, request);

		return eta.renderFile(
			absolute_path(`../app/pages/${component}`), { request, response, head, data }
		);
	});
}

server.start({ port });

log(`server: ${port}`);
