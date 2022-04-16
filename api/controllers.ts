import { RouteContext } from '../server/types.ts';
import { sanity_fetch } from '../server/sanity.ts';

export async function home() {
	const query = `*[slug.current == $slug][0]`;
	const query_params = { slug: 'alfa' };

	const data = {
		description: 'This comes from controllers.ts. Returns data from sanity.',
		from_sanity: await sanity_fetch(query, query_params),
	};

	const meta = {
		title: 'STATIC TEST',
	};

	return { data, meta };
}

export async function page(context: RouteContext) {
	const data = {
		description: 'This comes from controllers.ts. Returns a static object.',
		params: context.params,
		numbers: [1, 2, 3, 4],
	};

	const meta = {
		title: 'PAGE – STATIC TEST',
	};

	return { data, meta };
}
