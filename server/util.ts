import { process } from './dependencies.ts';

export const development_mode = process.mode === 'development';

export function log(message: string, color: string = ''): void {
	console.log('%c' + `[${new Date().toISOString().replace('T', ' ').slice(0, 19)}] → ${message}`, `color:${color}`);
}