import { eta } from './dependencies.ts';

eta.configure({
	views: 'frontend/components/',
});

export async function get_handler({ request, params }, { route }) {
	if (!route.controller) {
		route.controller = () => ({ head: {}, data: {} });
	}

	const { head, data }: any = await route.controller(request);

	const page_file = await Deno.readTextFile(`frontend/pages/${route.page}`);
	const app_file = await Deno.readTextFile('frontend/components/app.eta');

	const page = eta.render(page_file, { request, head, data });
	const app = eta.render(app_file, { request, head, data, page });

	return new Response(app, {
		headers: { 'content-type': 'text/html' }
	});
}

export async function post_handler({ request, params }, { route }) {
	const { data }: any = await route.controller(request);

	return new Response(data, {
		headers: { 'content-type': 'application/json' }
	});
}
