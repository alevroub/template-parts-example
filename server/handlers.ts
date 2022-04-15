import { Route, Context, ContextRequest, ContextResponse } from './types.ts';

import { mimetype, render } from './dependencies.ts';
import { read_templates } from './templates.ts';

import meta_default from '../frontend/app/meta.ts';
import render_filters from '../frontend/app/filters.ts';

export async function handle_get(route: Route, context: Context): Promise<void> {
	const { request, response } = context;
	const { template_main, template_pages } = await read_templates();
	const { data, meta } = await route.controller(context);

	const render_options = {
		include_path: 'frontend/components/',
	};

	const render_data = { request, data, meta: Object.assign(meta_default, meta) };

	const rendered_page = await render(
		template_pages[route.page],
		render_data,
		render_filters,
		render_options
	);

	const rendered_app = await render(
		template_main.replace('<!--RENDERED_PAGE-->', rendered_page),
		render_data,
		render_filters,
		render_options
	);

	response.body = rendered_app;
}

export async function handle_post(route: Route, context: Context): Promise<void> {
	const { response } = context;
	const { data } = await route.controller(context);

	response.headers = new Headers({ 'content-type': 'application/json' });
	response.body = JSON.stringify(data);
}

export async function handle_static(context: Context): Promise<void> {
	const { request, response } = context;
	const url = new URL(request.url.href);

	try {
		const file = await Deno.readFile('frontend' + url.pathname);
		const file_mimetype = mimetype(url.pathname) || 'text/plain';

		response.headers = new Headers({ 'content-type': file_mimetype });
		response.body = file;
	} catch (error) {
		response.status = error.name === 'NotFound' ? 404 : 500;
	}
}
