import { mimetype, path, process } from './dependencies.ts';

export const development_mode = process.mode === 'development';

export function log(message: string, color: string = '') {
	const log_message = `[${new Date().toISOString().replace('T', ' ').slice(0, 19)}] → ${message}`;
	console.log('%c' + log_message, `color:${color}`);
}

export async function serve_static(request) {
	const url = new URL(request.url);
	const pathname = url.pathname;
	const file = await Deno.readFile('frontend' + pathname);
	// const extension = url.pathname.split('.').pop();

	return new Response(file, {
		headers: {
			"content-type": mimetype(pathname)
		}
	});
}