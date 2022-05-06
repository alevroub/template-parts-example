import { in_development } from '../_lib/mod.ts';

export default {
	website: {
		meta: {
			title: 'My title',
			description: 'My description',
		},
	},

	sanity: {
		id: 'a90ecek9',
		dataset: in_development ? 'testing' : 'production',
		version: '2022-05-01',
		token: 'sk5jKVpwvQv4ktLX9ijSTDgiThiJ2eynqsG5x3FzjpboeSlH665dMpSn9QqUhVncaFJik679EYfaonSh36OPDhLqsAKfgxZLfcTsSE09GZQ2peABR9Qkoq6rHM0n9qvtTIj6iHswH1GapOReW35tc8AIIU3UgTUAf50xA3S12WP1ZK6OFnRI',
		// cdn: true,
	},

	engine: {
		filters: {
			uppercase: value => {
				return value.toString().toUpperCase();
			},
		},
	},
};