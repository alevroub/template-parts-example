export const default_setup = {
	port: 3000,

	get origin() {
		return this.website.meta.url;
	},

	get origins_allowed() {
		return [this.origin];
	},

	website: {
		meta: {
			title: 'Default title',
			description: 'Default description',
			image: 'assets/default.png',
			url: 'https://production.url.com',
			theme: '#ffffff',
			language: 'no',
			locale: 'nb_NO',
		},
	},

	router: {
		routes: [],
		routes_static: [
			'/assets/(.*)',
			'/static/(.*)',
			'/script/(.*)',
			'/style/(.*)'
		],
	},

	engine: {
		filters: {
			json: (value: object) => {
				return JSON.stringify(value, null, 3);
			},

			escape: (value: string) => {
				const map = {
					'&': '&amp;',
					'<': '&lt;',
					'>': '&gt;',
					'"': '&quot;',
					"'": '&#39;',
					'`': '&#x60;',
					'=': '&#x3D;',
					'/': '&#x2F;',
				};

				return value.replace(/[&<>"'`=\/]/g, s => map[s]);
			},
		},

		show_comments: false,
	},

	framework: {
		template: 'frontend/app/base.html',
		source: 'frontend/',
		components: 'frontend/components/',
		pages: 'frontend/pages/',
		controllers: 'server/controllers/',
	},
};
