import { index, page } from './controllers.ts'

export default [
	{ path: '/:page_id', page: 'page.html', controller: page },
	{ path: '/', page: 'index.html', controller: index },
	{ path: '*', page: '404.html' },
];
