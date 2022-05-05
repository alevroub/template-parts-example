import { sanity_client } from '../_lib/mod.ts';

export async function home(context) {
	const query = `*[slug.current == $slug][0]`;
	const query_params = { slug: 'alfa' };

	// const sanity = await sanity_client();
	// const data = await sanity.fetch(query, query_params);
	const meta = { title: 'STATIC TEST' };

	return { meta, data };
}

export async function page(context) {
	const data = {
		params: context.params,
		numbers: [1, 2, 3, 4],
	};

	const meta = {
		title: 'PAGE – STATIC TEST',
	};

	return { meta, data };
}