import { log, in_development_mode, import_user_server_setup } from '../global/util.ts';
import { get_from_cache, store_in_cache } from './cache.ts';

export async function sanity_client() {
	const user_setup = await import_user_server_setup();
	const { id, version, dataset, cdn, token } = user_setup.sanity;

	async function client_fetch(query: string, params: Record<string, any>): Promise<any> {
		const host = cdn === true ? 'apicdn.sanity.io' : 'api.sanity.io';
		const encoded_query = encodeURIComponent(query);
		const encoded_params = Object.keys(params).reduce((sequence, key) => {
			return sequence + `&${encodeURIComponent(`$${key}`)}=${encodeURIComponent(JSON.stringify(params[key]))}`;
		}, '');

		const request_url = `https://${id}.${host}/v${version}/data/query/${dataset}?query=${encoded_query}${encoded_params}`;
		const response = await fetch(request_url);
		const response_json = await response.json();

		if (response.status < 400) {
			return response_json.result;
		} else {
			throw new Error(response_json.message);
		}
	}

	async function client_fetch_cache(query: string, params: Record<string, any>): Promise<any> {
		if (in_development_mode) {
			const cached_result = await get_from_cache(query);

			if (cached_result) {
				return cached_result;
			}
		}

		try {
			const result = await client_fetch(query, params);

			if (in_development_mode) {
				store_in_cache(query, result);
			}

			return result;
		} catch (error) {
			log('sanity error: ' + error.message, 'red');
			return null;
		}
	}

	return {
		fetch: client_fetch_cache
	}
}