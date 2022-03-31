import { sanity_fetch } from '../server/sanity.ts';

export async function index(request: any) {
	const query = `*[slug.current == $slug][0]`;
	const params = { slug: 'alfa' };

	const data: any = await sanity_fetch(query, params);
	const head: any = { title: 'HOMEPAGE' };

	return { head, data };
}

export async function page(request: any) {
	const data: any = { something: [1, 2, 3, 4] };
	const head: any = { title: 'PAGE TITLE' };

	return { head, data }
}
