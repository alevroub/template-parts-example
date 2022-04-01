import { development_mode } from '../server/util.ts'

export default {
	port: 8000,
	origin: development_mode ? 'http://localhost:3000' : 'http://production.mode',
	origins_allowed: [],
	sanity: {
		id: "32td7jzv",
		version: '2022-03-01',
		dataset: 'production',
	}
}