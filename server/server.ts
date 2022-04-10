import { serve, router } from './dependencies.ts';
import { log, serve_static } from './util.ts';
import { get_handler, post_handler } from './handlers.ts';

import routes from '../api/routes.ts';
import config from '../api/config.ts';

const static_routes = {
	'/assets/*': serve_static,
	'/style/*': serve_static,
	'/script/*': serve_static,
};

const server_routes = routes.reduce((all, route) => {
	all[route.path] = (request: Request, connection: any, params: any) => {
		return get_handler(request, connection, params);
	};

	return all;
}, {});

const server_options = {
	port: config.port,
};

const server_router = router({
	...static_routes,
	...server_routes,
});

serve(server_router, server_options);

log(`Port: ${config.port}`, 'blue');
log(`Origin: ${config.origin}`, 'blue');
