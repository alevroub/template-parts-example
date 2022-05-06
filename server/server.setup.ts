export default {
	meta: {
		title: 'My title',
		description: 'My description',
	},

	sanity: {
		id: '32td7jzv',
		dataset: 'production',
		version: '2022-05-01',
		cdn: true,
	},

	filters: {
		uppercase: (value: any) => {
			return value.toString().toUpperCase();
		},
	},
};
