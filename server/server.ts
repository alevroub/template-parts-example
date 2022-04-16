import { log } from './util.ts';
import { oak_server, oak_router } from './dependencies.ts';
import { handle_get, handle_post, handle_static } from './handlers.ts';
import { routes, config } from './lib.ts';
import { websockets, route_websockets, connect_watcher } from './watch.ts'

const server = new oak_server();
const router = new oak_router();

route_websockets(router);

router.get('/style/(.*)', handle_static);
router.get('/script/(.*)', handle_static);
router.get('/assets/(.*)', handle_static);

for (const route of routes) {
	router.get(route.path, context => handle_get(route, context));
	router.post(route.path, context => handle_post(route, context));
}

server.use(router.routes());
server.listen({ port: config.port });

log(`Port: ${config.port}`, 'blue');
log(`Origin: ${config.origin}`, 'blue');

connect_watcher();
