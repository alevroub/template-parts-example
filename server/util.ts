import { path } from './dependencies.ts';

function log(message: string) {
	const log_message = `[${new Date().toISOString().replace('T', ' ').slice(0, 19)}] → ${message}`;
	console.log(log_message);
}

function absolute_path(filepath: string) {
	const server_directory = path.dirname(path.fromFileUrl(import.meta.url));
	return path.resolve(path.join(server_directory, filepath));
}

export { log, absolute_path }