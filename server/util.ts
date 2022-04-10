import { mimetype, path, process } from './dependencies.ts';

export const development_mode = process.mode === 'development';

export function log(message: string, color: string = '') : void {
	const log_message = `[${new Date().toISOString().replace('T', ' ').slice(0, 19)}] → ${message}`;
	console.log('%c' + log_message, `color:${color}`);
}

export async function serve_static(request: Request) : Promise<Response> {
	const url = new URL(request.url);
	const file = await Deno.readFile('frontend' + url.pathname);
	const file_mimetype = mimetype(url.pathname) || 'text/plain';
	// const extension = url.pathname.split('.').pop();

	return new Response(file, {
		headers: new Headers({ 'content-type': file_mimetype })
	});
}