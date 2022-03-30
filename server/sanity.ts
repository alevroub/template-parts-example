import config from '../api/config.ts'

export async function sanity_fetch(query: string, params: any = {}) {
	/* should use the official client at some point */

	const { id, version, dataset } = config.sanity;

	const encoded_query = encodeURIComponent(query);
	const encoded_params = Object.keys(params).map(key => `&$${key}=${JSON.stringify(params[key])}`).join('');
	const request_url = `https://${id}.api.sanity.io/v${version}/data/query/${dataset}?query=${encoded_query}${encoded_params}`;

	const response = await fetch(request_url);
	const { result } = await response.json();

	return result;
}