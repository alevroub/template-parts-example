import { sanity_client } from 'https://raw.githubusercontent.com/alevroub/nett/main/mod.ts';
import setup from './server.setup.ts';

const sanity = sanity_client(setup);

export async function home(context: any) {
	const query = `*[_type == 'font'][0]`;

	const data = await sanity.fetch(query);
	const meta = { title: 'STATIC TEST' };

	return { meta, data };
}

export async function page(context: any) {
	const data = {
		params: context.params,
		numbers: [1, 2, 3, 4],
	};

	const meta = {
		title: 'PAGE – STATIC TEST',
	};

	return { meta, data };
}