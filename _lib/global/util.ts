import { cli_args, path_join } from './dependencies.ts';

export const in_development_mode = cli_args.mode === 'development';

export function log(message: string, color: string = ''): void {
	console.log('%c' + `[${new Date().toISOString().replace('T', ' ').slice(0, 19)}] → ${message}`, `color:${color}`);
}

export function type_of(value: any) {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

export function deep_merge(a: object, b: object) {
	const c = { ...a };

	for (const key in b) {
		const type_a = type_of(a[key]);
		const type_b = type_of(b[key]);

		if (type_a === 'array' && type_b === 'array') {
			c[key] = [...a[key], ...b[key]];
		} else if (type_a === 'object' && type_b === 'object') {
			c[key] = deep_merge(a[key], b[key]);
		} else {
			c[key] = b[key];
		}
	}

	return c;
}

export async function import_user_server_setup(): object {
	const user_setup_filename = '/server/setup.ts';
	const user_setup = (await import(path_join(Deno.cwd(), user_setup_filename))).default;

	log('dynamic import', 'green')

	return user_setup;
}