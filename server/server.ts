import { serve, router } from './dependencies.ts';
import { log } from './util.ts';
import { handle_get, handle_post, handle_static } from './handlers.ts';

import routes from '../api/routes.ts';
import config from '../api/config.ts';

const static_routes = {
	'/assets/*': handle_static,
	'/style/*': handle_static,
	'/script/*': handle_static,
};

const server_routes = routes.reduce((reduced: any, route: any) => {
	const methods = {
		[`GET@${route.path}`]: (request: Request, params: object) => handle_get(request, params, route),
		[`POST@${route.path}`]: (request: Request, params: object) => handle_post(request, params, route)
	};

	return { ...reduced, ...methods };
}, {});

const server_router = router({
	...static_routes,
	...server_routes,
});

serve(server_router, { port: config.port });

log(`Port: ${config.port}`, 'blue');
log(`Origin: ${config.origin}`, 'blue');
