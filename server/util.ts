import { path, process } from './dependencies.ts';

export const development_mode = process.mode === 'development';

export function log(message: string, color: string = '') {
	const log_message = `[${new Date().toISOString().replace('T', ' ').slice(0, 19)}] → ${message}`;
	console.log('%c' + log_message, `color:${color}`);
}

export function absolute_path(filepath: string) {
	const server_directory = path.dirname(path.fromFileUrl(import.meta.url));
	return path.resolve(path.join(server_directory, filepath));
}