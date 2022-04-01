import { development_mode } from '../server/util.ts'

export default {
	port: 80,
	origin: development_mode ? 'http://localhost:3000' : 'https://alejandro.deno.dev',
	origins_allowed: [],
	sanity: {
		id: "32td7jzv",
		version: '2022-03-01',
		dataset: 'production',
	}
}