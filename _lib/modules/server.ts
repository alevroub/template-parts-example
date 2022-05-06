import {
	path_join,
	path_parse,
	render,
	process,
	mimetype,
	oak_server,
	oak_router,
	Context,
	Request,
	Response,
} from '../global/dependencies.ts';

import { log, deep_merge, import_user_server_setup, in_development } from '../global/util.ts';
import { default_setup } from '../config/defaults.ts';
import { start_file_watcher, route_file_watcher, inject_file_watcher_client } from './watch.ts';

type RouteContext = Context & {
	params?: any;
};

type RouteController = (context: Context) => Promise<{
	data: any;
	meta: Record<string, string>;
}>;

type Route = {
	path: string;
	page: string;
	controller: RouteController;
};

let server_setup = default_setup;
let server_templates = {};

async function handle_get_request(route: Route, context: RouteContext): Promise<void> {
	/**
	 *
	 * 	read main template and page files, then render using Nano.
	 * 	this step will also merge the default meta object with the
	 * 	user defined object.
	 *
	 * */

	// just ignore automatic favicon.ico requests (!)
	if (context.request.url.pathname === '/favicon.ico') {
		response.status = 200;
	}

	const { request, response } = context;
	const { template_main, template_pages } = server_templates;

	let route_meta = {};
	let route_data = {};

	const route_page = template_pages[route.page];
	const route_controller = route.controller;

	if (route_page === undefined) {
		log(`${route_page} is undefined`);
	}

	if (route_controller !== undefined) {
		const controller_result = await route_controller(context);

		route_meta = controller_result.meta || {};
		route_data = controller_result.data || {};
	}

	const route_render_data = {
		request: request,
		data: route_data,
		meta: merge_meta_object(route_meta, request.url),
	};

	const rendered_page = await render_template(template_pages[route.page], route_render_data);
	const rendered_app = await render_template(template_main.replace('<!--CURRENT_PAGE-->', rendered_page), route_render_data);

	if (in_development) {
		response.body = inject_file_watcher_client(rendered_app);
	} else {
		response.body = rendered_app;
	}

	function merge_meta_object(route_meta: object, route_url: URL) {
		const computed_meta = {
			url: server_setup.origin + route_url.pathname,
		};

		return {
			...server_setup.website.meta,
			...route_meta,
			...computed_meta,
		};
	}

	function render_template(template: string, data: any) {
		const filters = server_setup.engine.filters;
		const options = {
			show_comments: server_setup.engine.show_comments,
			import_path: server_setup.framework.components,
		};

		return render(template, data, filters, options);
	}
}

async function handle_post_request(route: Route, context: RouteContext): Promise<void> {
	/**
	 *
	 * 	return the same data from the controller as json.
	 * 	this essentially turns each page's content into an API.
	 *
	 * */

	const { response } = context;
	const { data } = await route.controller(context);

	response.headers = new Headers({ 'content-type': 'application/json' });
	response.body = JSON.stringify(data);
}

async function handle_static_files(context: RouteContext): Promise<void> {
	/**
	 *
	 * 	serve static files
	 *
	 * */

	try {
		await context.send({
			root: path_join(Deno.cwd(), server_setup.framework.source),
		});
	} catch (error) {
		log('router error: ' + error.message, 'red');
	}
}

async function setup_settings(user_settings) {
	server_setup = deep_merge(default_setup, user_settings);
	server_templates = await load_templates();

	async function load_templates() {
		async function load_main_template() {
			return Deno.readTextFile(server_setup.framework.template);
		}

		async function load_page_templates() {
			const pages = {};

			for await (const page of Deno.readDir(server_setup.framework.pages)) {
				pages[page.name] = await Deno.readTextFile(`${server_setup.framework.pages}${page.name}`);
			}

			return pages;
		}

		return {
			template_main: await load_main_template(),
			template_pages: await load_page_templates()
		}
	}
};

async function new_server(setup) {
	await setup_settings(setup);

	function setup_server() {
		const server = new oak_server();

		return {
			instance: server,

			route: router_instance => {
				for (const route of server_setup.router.routes) {
					router_instance.get(route.path, context => handle_get_request(route, context));
				}

				server.use(router_instance.routes());
			},

			start: () => {
				log(`port: ${server_setup.port}`, 'blue');
				log(`origin: ${server_setup.origin}`, 'blue');

				server.listen({ port: server_setup.port });

				start_file_watcher();
			},
		};
	}

	function setup_router() {
		const router = new oak_router();

		route_file_watcher(router);

		for (const route of server_setup.router.routes_static) {
			router.get(route, handle_static_files);
		}

		return router;
	}

	return {
		server: setup_server(),
		router: setup_router()
	}
}

export { log, new_server, in_development };
