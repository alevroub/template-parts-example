import { home, page } from './controllers.ts';

export default [
	{ path: '/:page_id', page: 'page.html', 	controller: page 	},
	{ path: '/', 			page: 'home.html', 	controller: home 	},
	{ path: '(.*)', 		page: '404.html' 								},
];
