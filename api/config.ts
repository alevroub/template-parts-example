import { development_mode } from '../server/util.ts'

const port = development_mode ? 3000 : 80;

export default {
	port: port,
	origin: development_mode ? `http://localhost:${port}` : 'https://alejandro.deno.dev',
	origins_allowed: [],
	sanity: {
		id: "32td7jzv",
		version: '2022-03-01',
		dataset: 'production',
		cdn: true
	}
}