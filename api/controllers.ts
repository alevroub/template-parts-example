import { sanity_fetch } from '../server/sanity.ts';

export async function index(request: Request, params: Record<string, string>) {
	const query = `*[slug.current == $slug][0]`;
	const query_params = { slug: 'alfa' };

	const data = await sanity_fetch(query, query_params);
	const meta = { title: 'HOMEPAGE' };

	return { meta, data };
}

export async function page(request: Request, params: Record<string, string>) {
	const data = { numbers: [1, 2, 3, 4] };
	const meta = { title: 'PAGE TITLE' };

	return { meta, data };
}
