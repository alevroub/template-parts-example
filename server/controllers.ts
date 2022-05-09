import { Sanity } from 'https://boing.boing.link';
import config from './config.ts';

const sanity = Sanity(config);

export async function home(context: any) {
	const query = `{
		'projects': *[_type == 'project']
	}`;

	const data = await sanity.fetch(query);
	const meta = {
		title: `Total: ${data.projects.length} projects`
	};

	return { meta, data };
}

export async function page(context: any) {
	const query = `*[$slug == slug.current][0]`;
	const params = { slug: context.params.project_slug };
	const data = await sanity.fetch(query, params);

	if (!data) {
		context.response.redirect('/404');
	}

	const meta = {
		title: 'PAGE – STATIC TEST',
	};

	return { meta, data };
}
