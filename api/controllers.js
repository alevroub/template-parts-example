import { sanity_fetch } from '../server/sanity.ts';

export async function home(context) {
	const query = `*[slug.current == $slug][0]`;
	const query_params = { slug: 'alfa' };

	const data = await sanity_fetch(query, query_params);
	const meta = { title: 'STATIC TEST' };

	return { data, meta };
}

export async function page(context) {
	return {
		data: {
			params: context.params,
			numbers: [1, 2, 3, 4],
		},

		meta: {
			title: 'PAGE – STATIC TEST',
		}
	};
}
