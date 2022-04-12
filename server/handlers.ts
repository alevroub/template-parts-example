import { render } from './dependencies.ts'

const rendering_options = {
	show_comments: true,
	include_path: 'frontend/components/'
}

const rendering_filters = {
	json: (value: any) => JSON.stringify(value, null, 3)
};

export async function get_handler(request: Request, connection: object, params: object, route: any) : Promise<Response> {
	const { head, data }: any = await route.controller(request, params);

	const page_file = await Deno.readTextFile(`frontend/pages/${route.page}`);
	const app_file = await Deno.readTextFile('frontend/components/app.html');

	const page = await render(page_file, { request, head, data }, rendering_filters, rendering_options);
	const app = await render(app_file, { request, head, data, page }, rendering_filters, rendering_options);

	return new Response(app, {
		headers: new Headers({ 'content-type': 'text/html' })
	});
}

export async function post_handler(request: Request, connection: object, params: object, route: any) : Promise<Response> {
	// const { data }: any = await route.controller(request, params);

	return new Response(`{ "foo": "bar" }`, {
		headers: new Headers({ 'content-type': 'application/json' })
	});
}
