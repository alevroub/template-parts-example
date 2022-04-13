import config from '../api/config.ts'

export async function sanity_fetch(query: string, params: object = {}): Promise<any> {
	const { id, version, dataset, cdn } = config.sanity;

	const host = cdn === true ? 'apicdn.sanity.io' : 'api.sanity.io';
	const encoded_query = encodeURIComponent(query);
	const encoded_params = Object.keys(params).reduce((sequence, key) => sequence + `&${encodeURIComponent(`$${key}`)}=${encodeURIComponent(JSON.stringify(params[key]))}`, '');
	const request_url = `https://${id}.${host}/v${version}/data/query/${dataset}?query=${encoded_query}${encoded_params}`;

	const response = await fetch(request_url);
	const { result } = await response.json();

	return result;
}