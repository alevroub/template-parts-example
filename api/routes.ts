import { index, page } from './controllers.ts'

export default [
	{ path: '/:page_id', page: 'page.eta', controller: page },
	{ path: '/', page: 'index.eta', controller: index },
	{ path: '*', page: '404.eta' },
];
