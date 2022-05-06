import { home, page } from './controllers.ts';

export default [
	{
		path: '/404',
		page: '404.html',
	},
	{
		path: '/:project_slug',
		page: 'page.html',
		controller: page,
	},
	{
		path: '/',
		page: 'home.html',
		controller: home,
	},
	{
		path: '/(.*)',
		page: '404.html',
	},
];
