#!/usr/local/bin/deno run --no-check --allow-all

import { abc, process } from './server/dependencies.ts';
import { get_handler } from './server/handlers.ts';

import routes from './api/routes.ts';
import config from './api/config.ts';

const { Router, Context } = abc;
const router = new Router();

for (const route of routes) {
	router.add('get', route.path, route);
}

const base_url = config.origin;
const build_directory = './build'
const paths = process.paths.split(',');

for (const path of paths) {
	const path_request = new Request(base_url + path);
	const path_context = new Context({ r: path_request });
	const route = router.find('get', path_context);
	const rendered = await get_handler(path_context, route);

	await Deno.mkdir(build_directory + path, { recursive: true });
	await Deno.writeTextFile(build_directory + path + '/index.html', rendered);
}
