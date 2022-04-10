export async function get_handler(request: Request, connection: any, params: any) : Promise<Response> {
	// const { head, data }: any = await route.controller(request);

	// const page_file = await Deno.readTextFile(`frontend/pages/${route.page}`);
	// const app_file = await Deno.readTextFile('frontend/components/app.eta');

	// const page = eta.render(page_file, { request, head, data });
	// const app = eta.render(app_file, { request, head, data, page });

	return new Response(`Navigated to ${request.url}`, {
		headers: new Headers({ 'content-type': 'text/html' })
	});
}

export async function post_handler(request: Request, connection: any, params: any) : Promise<Response> {
	// const { data }: any = await route.controller(request);

	return new Response(`{ "foo": "bar" }`, {
		headers: new Headers({ 'content-type': 'application/json' })
	});
}
