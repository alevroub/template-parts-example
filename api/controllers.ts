import { Context } from '../server/types.ts';
import { sanity_fetch } from '../server/sanity.ts';

export async function index(context: Context) {
	const query = `*[slug.current == $slug][0]`;
	const query_params = { slug: 'alfa' };

	const data = await sanity_fetch(query, query_params);
	const meta = { title: 'HOMEPAGE' };

	return { data, meta };
}

export async function page(context: Context) {
	const data = { numbers: [1, 2, 3, 4] };
	const meta = { title: 'PAGE TITLE' };

	return { data, meta };
}
