import { development_mode } from '../server/util.ts'

export default {
	port: 3000,
	origin: development_mode ? 'http://localhost' : 'http://production.mode',
	allowed_origins: ['http://localhost:3000']
}