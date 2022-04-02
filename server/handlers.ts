import { eta } from './dependencies.ts';

eta.configure({
	views: 'frontend/components/',
});

export async function get_handler({ request, response }, route) {
	if (!route.controller) {
		route.controller = () => ({ head: {}, data: {} });
	}

	const { head, data }: any = await route.controller(request);

	const page_file = await Deno.readTextFile(`frontend/pages/${route.page}`);
	const app_file = await Deno.readTextFile('frontend/components/app.eta');

	const page = eta.render(page_file, { request, response, head, data });
	const app = eta.render(app_file, { request, response, head, data, page });

	return app;
}

export async function post_handler({ request, response }, route) {
	const { data }: any = await route.controller(request);
	return data;
}
