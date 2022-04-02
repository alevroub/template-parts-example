import { abc, path } from './dependencies.ts';
import { log } from './util.ts';
import { cors } from './middleware.ts';
import { get_handler, post_handler } from './handlers.ts';

import routes from '../api/routes.ts';
import config from '../api/config.ts';

const server = new abc.Application();

server.static('/assets', '/frontend/assets');
server.static('/style', '/frontend/style');
server.static('/script', '/frontend/script');

for (const route of routes) {
	server.get(route.path, context => get_handler(context, route));
	server.post(route.path, context => post_handler(context, route), cors);
}

server.start({ port: config.port });

log(`Port: ${config.port}`, 'blue');
log(`Origin: ${config.origin}`, 'blue');
