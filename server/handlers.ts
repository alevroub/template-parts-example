import { mimetype, render } from './dependencies.ts';
import { template_main, template_pages } from './templates.ts';

import meta_default from '../frontend/app/meta.ts';
import render_filters from '../frontend/app/filters.ts';

export async function handle_static(request: Request): Promise<Response> {
	const url = new URL(request.url);

	try {
		const file = await Deno.readFile('frontend' + url.pathname);
		const file_mimetype = mimetype(url.pathname) || 'text/plain';

		return new Response(file, {
			headers: new Headers({ 'content-type': file_mimetype }),
		});
	} catch (error) {
		return new Response(null, {
			status: error.name === 'NotFound' ? 404 : 500,
		});
	}
}

export async function handle_get(request: Request, params: object, route: any): Promise<Response> {
	if (!route.controller) {
		route.controller = () => ({ meta: {}, data: {} });
	}

	const render_options = {
		show_comments: false,
		include_path: 'frontend/components/',
	};

	const { meta, data }: any = await route.controller(request, params);

	const render_data = { meta: Object.assign(meta_default, meta), data, request };
	const rendered_page = await render(template_pages[route.page], render_data, render_filters, render_options);
	const rendered_app = await render(template_main.replace('<!--RENDERED_PAGE-->', rendered_page), render_data, render_filters, render_options);

	return new Response(rendered_app, {
		headers: new Headers({ 'content-type': 'text/html' }),
	});
}

export async function handle_post(request: Request, params: object, route: any): Promise<Response> {
	const { data }: any = await route.controller(request, params);

	return new Response(JSON.stringify(data), {
		headers: new Headers({ 'content-type': 'application/json' }),
	});
}
