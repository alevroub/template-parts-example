import { serve, router, path } from './dependencies.ts';
import { log } from './util.ts';
import { cors } from './middleware.ts';
import { get_handler, post_handler } from './handlers.ts';

import routes from '../api/routes.ts';
import config from '../api/config.ts';

// const server = new oak_server();
// const router = new oak_router();

// server.static('/assets', '/frontend/assets');
// server.static('/style', '/frontend/style');
// server.static('/script', '/frontend/script');

// for (const route of routes) {
// 	router.get(route.path, context => get_handler(context, route));
// 	server.post(route.path, context => post_handler(context, route), cors);
// }

// await server.listen({ port: config.port });

serve(
	router({
		'/:page_id': async (request, connection, params) => {
			const url_query = () => {
				const [url, query] = request.url.split('?');
				const pairs = query.split('&');

				return pairs.reduce((fields, pair) => {
					const [key, value] = pair.split('=');

					fields[key] = value;

					return fields;
				}, {});
			};

			console.log(url_query());

			return new Response(JSON.stringify(request), { headers: { 'content-type': 'text/html' } });
		},

		'/': (request, connection, params) => {
			return new Response('home' + JSON.stringify(params), { headers: { 'content-type': 'text/html' } });
		},
	}),
	{ port: config.port }
);

log(`Port: ${config.port}`, 'blue');
log(`Origin: ${config.origin}`, 'blue');
