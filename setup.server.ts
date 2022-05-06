// import { in_development } from './_lib/mod.ts';
import { page, home } from './server/controllers.ts'

export default {
	website: {
		meta: {
			title: 'My title',
			description: 'My description',
		},
	},

	router: {
		routes: [
			{
				path: '/:page_id',
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
		],
	},

	engine: {
		filters: {
			uppercase: value => {
				return value.toString().toUpperCase();
			},
		},
	},
};
