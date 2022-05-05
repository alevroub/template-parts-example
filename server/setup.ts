import { page, home } from './controllers.ts'

export const setup = {
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
				controller: page
			},
			{
				path: '/',
				page: 'home.html',
				controller: home
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

	sanity: {
		id: '32td7jzv',
		dataset: 'production',
		version: '2022-05-01',
		cdn: true
	}
};
